import { NextRequest } from "next/server";
import { checkIsProperString, schema } from "@/data/helpers";
import { createClient } from "@/utils/supabase/server";
import moment from 'moment';
import Yup from 'yup';

export async function GET(request : NextRequest) {
    // get search params
    let filter = request.nextUrl.searchParams.get("filter");
    
    // get client
    const supabase = createClient();

    // get reviews table
    let reviews;
    try{
        const { data, error } = await supabase
            .from("post_user_like")
            .select('*')
            .range(0,10);
        if (!data || error ) return Response.json({success: false, error:`Server Error`, object:error});
        reviews = data;
    } catch (error : any) { return Response.json({success: false, error:`1: ${error}`}); }

    // edit date info
    reviews.map((review) => review.created_at = moment(review.created_at).format('MM/DD/YYYY h:mm a'));

    return Response.json({success:true, data:reviews});
}