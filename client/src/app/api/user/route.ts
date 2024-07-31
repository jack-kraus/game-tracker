import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { object, string, number } from 'yup';
import { SupabaseClient } from "@supabase/supabase-js";

const PER_PAGE = 10;
const paramSchema = object({
    followers : string().trim().uuid(),
    following : string().trim().uuid(),
    liked : number().min(0),
    query : string().trim().transform((val) => val.replace("\"", "")),
    page : number().default(0).integer().min(0),
    perPage : number().default(PER_PAGE).integer().min(0)
});
export const dynamic = 'force-dynamic';

function constructQuery(supabase : SupabaseClient, count : boolean, { query, page, perPage, following, followers, liked }) {
    // construct query
    let supabase_query;
    if (following) supabase_query = supabase.rpc("get_following", {following_id : following});
    else if (followers) supabase_query = supabase.rpc("get_followers", {followers_id : followers});
    else if (liked) supabase_query = supabase.rpc("get_liked", {liker_id : liked});
    else supabase_query = supabase.from('profile_follow_status');
    
    // either we're counting all the results, or getting results in a range
    if (count) supabase_query = supabase_query.select('*', { count: 'exact', head: true });
    else supabase_query = supabase_query.select('*').range(page*perPage, (page+1)*perPage-1);
    
    // add query if found
    if (query) supabase_query = supabase_query.ilike('username', `%${query}%`);
    
    return supabase_query;
}

export async function GET(request : NextRequest) {
    // get search params
    let searchParams : any;
    try { searchParams = await paramSchema.validate(Object.fromEntries(request.nextUrl.searchParams)); }
    catch (error) { return Response.json({success: false, error:`${error}`}); }

    // get client
    const supabase = createClient();

    // construct query
    let supabase_query = constructQuery(supabase, false, searchParams);
    let count_query = constructQuery(supabase, true, searchParams);
    
    // get from server
    let result : any, lastPage : any;
    try {
        const { data, error } = await supabase_query;
        const { count } = await count_query;
       
        if (error) throw error.message;
        result = data;
        lastPage = Math.floor(count / searchParams.perPage);
    }
    catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // return users matching pattern
    return Response.json({success:true, lastPage, data:result});
}