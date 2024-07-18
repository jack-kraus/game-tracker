import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { object, string, number } from 'yup';

const PER_PAGE = 10;
const paramSchema = object({
    query : string().trim().transform((val) => val.replace("\"", "")).required(),
    page : number().default(0).integer().min(0),
    perPage : number().default(PER_PAGE).integer().min(0)
});
export const dynamic = 'force-dynamic';

export async function GET(request : NextRequest) {
    // get search params
    let searchParams : any;
    try { searchParams = await paramSchema.validate(Object.fromEntries(request.nextUrl.searchParams)); }
    catch (error) { return Response.json({success: false, error:`${error}`}); }

    // get client
    const supabase = createClient();

    // construct query
    let { query, page, perPage } = searchParams;
    let supabase_query = supabase.from('profile_follow_status').select('id, username').ilike('username', `%${query}%`).range(page*perPage,(page+1)*perPage-1);

    // get from server
    let result : any;
    try {
        const { data, error } = await supabase_query;
        if (error) throw error;
        result = data;
    }
    catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // return users matching pattern
    return Response.json({success:true, data:result});
}