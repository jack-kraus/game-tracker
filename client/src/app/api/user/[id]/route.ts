import { NextRequest } from "next/server";
import { checkIsProperString } from "@/data/helpers";
import { createClient } from "@/utils/supabase/server";
import {string} from "yup";

const uidSchema = string().required().uuid();
export const dynamic = 'force-dynamic';
export async function GET(_request : NextRequest , {params} : {params : {id: string}}) {
    // validate user id
    let id = params.id;
    try { id = await uidSchema.validate(id); }
    catch (error : any) { return Response.json({success: false, step:"1", error:error}); }

    // get admin andf regular client
    const supabase_ = createClient();

    // get current user
    const { data: { user } } = await supabase_.auth.getUser();
    let user_id;
    if (user && user.id) user_id = user.id;
    
    // user object define
    let info : any = { user_id: user_id || "none" };

    // get user attributes
    try {
        const { data, error } = await supabase_.from("profile_follow_status").select("*").eq("id", id);
        if (error || !data) return Response.json({success: false, error:`User not found: ${error}`});
        info = {...info, ...data[0]};
    } catch (error : any) { return Response.json({ success: false, error:`User not found: ${error}` }); }
    
    // return success
    return Response.json({success:true, data:info});
}