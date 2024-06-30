// export const dynamic = 'force-dynamic' // defaults to auto
import { NextRequest } from "next/server";
import { checkIsProperString, schema } from "@/data/helpers";
import { createClient } from "@/utils/supabase/server";
import moment from 'moment';

export async function GET(_request : NextRequest, {params} : {params : {id: string}}) {
    // check param
    let review_id = params.id;
    try { review_id = checkIsProperString(review_id, 1, true, "query"); }
    catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // get client
    const supabase = createClient();

    // check if review exists
    let review;
    try{
        const { data, error } = await supabase
        .from('post_user_like')
        .select('*')
        .eq('id', review_id);
        if (!data || data.length !== 1) return Response.json({success: false, message:`Review not found`, error:error});
        review = data[0];
    } catch (error : any) { return Response.json({success: false, error:`1: ${error}`}); }

    // edit date info
    review.created_at = moment(review.created_at).format('MM/DD/YYYY h:mm a');

    // get comments
    try {
        const { data, error } = await supabase
        .from('comment_user')
        .select('*')
        .eq('post', review_id);
        if (error) review.error = error;
        review.comments = data;
    } catch (error : any) {}

    // get is liked
    const { data } = await supabase.auth.getUser();
    let user_id;
    if (data.user && data.user.id) {
        user_id = data.user.id;
        const { count, error } = await supabase
            .from('like')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', review_id)
            .eq('user_id', user_id);
        if (!error) review.liked = !!count;
    }

    // get is mine
    review.mine = review_id == user_id;

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

export async function PATCH(request : NextRequest, {params} : {params : {id: string}}) {
    // check param
    let review_id = params.id;
    try { review_id = checkIsProperString(review_id, 1, true, "query"); }
    catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // validate body
    let body = await request.json();
    try { body = await schema.reviewEditSchema.validate(body); }
    catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // get client
    const supabase = createClient();

    // update
    try {
        console.log(body);
        const { data, error } = await supabase
            .from('post')
            .update(body)
            .eq('id', review_id)
            .select();
        if (error) throw error;
        else if (!data || !data[0]) throw "Update unsuccessful";
    }
    catch(error : any) { return Response.json({success: false, error:`${error}`}); }

    // if didn't get data return error
    console.log("updated");
    return Response.json({success:true});
}