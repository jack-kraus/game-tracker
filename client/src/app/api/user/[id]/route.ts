import { NextRequest } from "next/server";
import { checkIsProperString } from "@/data/helpers";
import { createClient } from "@/utils/supabase/server";
import { createClient as cc2 } from '@supabase/supabase-js';

export async function GET(_request : NextRequest , {params} : {params : {id: string}}) {
    // validate user id
    let id = params.id;
    try { id = checkIsProperString(id, 1, true, "Id"); }
    catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // get admin andf regular client
    const supabase = cc2(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ADMIN_KEY!, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
    });
    const supabase_ = createClient();

    // get current user
    const { data: { user } } = await supabase_.auth.getUser();
    let user_id;
    if (user && user.id) user_id = user.id;
    
    // user object define
    let info : any = { user_id:user_id || "none" };

    // get user attributes
    try {
        const { data, error } = await supabase_.from("profile_follow").select("*").eq("id", id);
        if (error || !data) return Response.json({success: false, error:`User not found: ${error}`});
        info = {...info, ...data[0]};
        console.log(data);
    } catch (error : any) { return Response.json({ success: false, error:`User not found: ${error}` }); }

    // get posts
    try {
        const { data } = await supabase_.from("post").select("*").eq("author", id);
        info.posts = data;
    }
    catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // get is following
    try {  
        const { count, error } = await supabase
            .from('follower')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user_id);
        if (error) throw error;
        info.following = !!count;
    } catch (error : any) { return Response.json({success: false, error:`${error}`}); }
    
    // return success
    return Response.json({success:true, data:info});
}