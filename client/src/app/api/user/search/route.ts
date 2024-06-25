import { NextRequest } from "next/server";
import { checkIsProperString } from "@/data/helpers";
import { searchGames } from "@/data/games";
import { createClient } from "@/utils/supabase/server";

export async function GET(request : NextRequest) {
    // get query text
    let query = request.nextUrl.searchParams.get("query") as string;
    try { query = checkIsProperString(query, 1, true, "query"); }
    catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // get client
    const supabase = createClient();

    // get from server
    let result;
    try {
        const { data, error } = await supabase
            .from('profile')
            .select('*')
            .ilike('username', `%${query}%`);
        if (error) throw error;
        result = data;
    }
    catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // return users matching pattern
    return Response.json({success:true, data:result});
}