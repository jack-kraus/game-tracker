import { NextRequest } from "next/server";
import { checkIsProperString } from "@/data/helpers";
import { createClient } from "@/utils/supabase/server";

export async function GET(_request : NextRequest , {params} : {params : {id: string}}) {
    // get game by id 
    let id = params.id;
    try { id = checkIsProperString(id, 1, true, "Id"); }
    catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // get result
    let results;
    try {
        const supabase = createClient();
        results = await supabase.from("post").select("*").eq("author", id);
    }
    catch (error : any) { return Response.json({success: false, error:`${error}`}); }
    
    return Response.json({success:true, results});
}