// export const dynamic = 'force-dynamic' // defaults to auto
import { NextRequest } from "next/server";
import { checkIsProperString, schema } from "@/data/helpers";
import { createClient } from "@/utils/supabase/server";

export async function DELETE(request : NextRequest, {params} : {params : {id: string}}) {
    // check param
    let review_id = params.id;
    try { review_id = checkIsProperString(review_id, 1, true, "query"); }
    catch (error : any) { return Response.json({success: false, step: "Validate ID", error:`${error}`}); }

    // get user
    const supabase = createClient();
    const user_object = await supabase.auth.getUser();
    if (!user_object || !user_object.data || !user_object.data.user) return Response.json({success: false, error:`User not found`});
    const user_id = user_object.data.user.id;

    // check if review exists
    try{
        const { data } = await supabase
        .from('post')
        .select('id, author')
        .eq('id', review_id);
        if (!data || data.length !== 1) return Response.json({success: false, error:`Review not found`});
        else if (data[0].author !== user_id) return Response.json({success: false, error:`Not authorized to delete this review`});
    } catch (error : any) { return Response.json({success: false, error:`${error}`}); }
    
    // delete review
    try {
        const { error } = await supabase
            .from('post')
            .delete()
            .eq('id', review_id);
        if (error) return Response.json({success:false, error:`${error}`});
    } catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // return success
    return Response.json({success:true});
}