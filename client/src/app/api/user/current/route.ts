import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(_request : NextRequest) {
    // get admin andf regular client
    const supabase_ = createClient();

    // get current user
    const { data: { user } } = await supabase_.auth.getUser();
    let user_id;
    if (user && user.id) user_id = user.id;
    
    // user object define
    let info : any = { user_id:user_id || "none" };

    // get user attributes
    try {
        const { data, error } = await supabase_.from("profile_follow").select("*").eq("id", user_id);
        if (error || !data) return Response.json({success: false, error:`User not found: ${error}`});
        info = {...info, ...data[0]};
        console.log(data);
    } catch (error : any) { return Response.json({ success: false, error:`User not found: ${error}` }); }

    // get posts
    try {
        const { data } = await supabase_.from("post").select("*").eq("author", user_id).order('created_at', { ascending: false });
        info.posts = data;
    }
    catch (error : any) { return Response.json({success: false, error:`${error}`}); }
    
    // return success
    return Response.json({success:true, data:info});
}