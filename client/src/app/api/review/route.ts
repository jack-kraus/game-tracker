import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import moment from 'moment';
import { object, string, number } from 'yup';

const PER_PAGE = 10;
const paramSchema = object({
    filter : string().default("none").lowercase().trim().oneOf(["none", "following"]),
    order : string().default("created_at").lowercase().trim().oneOf(["created_at", "likes"]),
    author : string().trim().uuid(),
    game : number(),
    page : number().default(0).integer().min(0),
    perPage : number().default(PER_PAGE).integer().min(0),
});

export async function GET(request : NextRequest) {
    // get search params
    let searchParams : any;
    try { searchParams = await paramSchema.validate(Object.fromEntries(request.nextUrl.searchParams)); }
    catch (error) { return Response.json({success: false, error:`${error}`}); }
    
    // get client
    const supabase = createClient();

    // construct query
    let { filter, page, perPage, order, author, game } = searchParams;
    let query = supabase.from(filter === "following" ? "post_user_like_following" : "post_user_like").select('*').range(page*perPage,(page+1)*perPage-1);
    if (author) query = query.eq("author", author);
    if (game) query = query.eq("game", game);
    if (order) query = query.order(order, { ascending: false });

    // get reviews table
    let reviews : any[];
    try {
        const { data, error } = await query;
        if (!data || error) return Response.json({success: false, error:`Server Error`, object: error});
        reviews = data;
    } catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // edit date info
    reviews.map((review : any) => review.created_at = moment(review.created_at).format('MM/DD/YYYY h:mm a'));

    return Response.json({success:true, data:reviews});
}