import { NextRequest } from "next/server";
import { checkIsProperString } from "@/data/helpers";
import { createClient } from "@/utils/supabase/server";
import { createClient as cc2 } from '@supabase/supabase-js';

export async function GET(_request : NextRequest , {params} : {params : {id: string}}) {
    // validate user id
    let id = params.id;
    try { id = checkIsProperString(id, 1, true, "Id"); }
    catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // get admin client
    const supabase = cc2(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ADMIN_KEY!, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
    });

    // user object define
    let user : any = {};

    // get user attributes
    try {
        const { data, error } = await supabase.auth.admin.getUserById(id);
        if (error) return Response.json({success: false, error:`User not found: ${error}`});
        user.username = data.user.user_metadata.username;
    } catch (error : any) { return Response.json({ success: false, error:`User not found: ${error}` }); }


    // get posts
    try {
        const supabase = createClient();
        const {data} = await supabase.from("post").select("*").eq("author", id);
        user.posts = data;
    }
    catch (error : any) { return Response.json({success: false, error:`${error}`}); }
    
    // return success
    return Response.json({success:true, data:user});
}