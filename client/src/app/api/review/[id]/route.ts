// export const dynamic = 'force-dynamic' // defaults to auto
import { NextRequest } from "next/server";
import { checkIsProperString, schema } from "@/data/helpers";
import { createClient } from "@/utils/supabase/server";
import { createClient as cc2 } from '@supabase/supabase-js'

export async function GET(_request : NextRequest, {params} : {params : {id: string}}) {
    // check param
    let review_id = params.id;
    try { review_id = checkIsProperString(review_id, 1, true, "query"); }
    catch (error : any) { return Response.json({success: false, step: "Validate ID", error:`${error}`}); }

    // get admin client
    const supabase = cc2(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ADMIN_KEY!, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
    });

    // check if review exists
    let review;
    try{
        const { data } = await supabase
        .from('post')
        .select('*')
        .eq('id', review_id);
        if (!data || data.length !== 1) return Response.json({success: false, error:`Review not found`});
        review = data[0];
    } catch (error : any) { return Response.json({success: false, error:`1: ${error}`}); }

    // get author info
    try {
        const { data, error } = await supabase.auth.admin.getUserById(review.author);
        if (error) return Response.json({success: false, error:`2: ${error}`});
        review.author = data.user.user_metadata.username;
    } catch (error : any) { return Response.json({success: false, error:`3: ${error}`}); }

    // edit date info
    review.created_at = new Date(review.created_at).toDateString();

    // get comments
    try{
        const { data } = await supabase
        .from('comment')
        .select('*')
        .eq('post', review_id);
        review.comments = data;
    } catch (error : any) {}

    // get likes
    try{
        let { count, error } = await supabase
        .from('like')
        .select('*', { count: 'exact', head: true })
        .eq('post', review_id);
        if (count && !error) review.likes = count;
    } catch (error : any) {}

    return Response.json({success:true, data:review});
}

export async function DELETE(_request : NextRequest, {params} : {params : {id: string}}) {
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