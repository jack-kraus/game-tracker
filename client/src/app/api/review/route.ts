import { NextRequest } from "next/server";
import { checkIsProperString, schema } from "@/data/helpers";
import { createClient } from "@/utils/supabase/server";
import moment from 'moment';
import Yup from 'yup';

const PER_PAGE = 2;

export async function GET(request : NextRequest) {
    // get search params
    let filter = request.nextUrl.searchParams.get("filter"),
    page = request.nextUrl.searchParams.get("page");
    const page_num = parseInt(page) || 0;

    // get client
    const supabase = createClient();

    // get review count
    let review_count : number;
    try{
        const { count, error } = await supabase
            .from(filter === "following" ? "post_user_like_following" : "post_user_like")
            .select('*', { count: 'exact', head: true });
        if (!count || error ) return Response.json({success: false, error:`Server Error`});
        review_count = count;
    } catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // get reviews table
    let reviews;
    try{
        const { data, error } = await supabase
            .from(filter === "following" ? "post_user_like_following" : "post_user_like")
            .select('*')
            .range(page_num*PER_PAGE,(page_num+1)*PER_PAGE-1);
        if (!data || error ) return Response.json({success: false, error:`Server Error`, object:error});
        reviews = data;
    } catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // edit date info
    reviews.map((review) => review.created_at = moment(review.created_at).format('MM/DD/YYYY h:mm a'));

    return Response.json({success:true, data:reviews});
}