import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import moment from 'moment';
import { object, string, number, boolean } from 'yup';
export const dynamic = 'force-dynamic';
const PER_PAGE = 10;
const paramSchema = object({
    filter : string().default("none").lowercase().trim().oneOf(["none", "following"]),
    order : string().default("created_at").lowercase().trim().oneOf(["created_at", "likes", "rating"]),
    last : string().default("all").lowercase().trim().oneOf(["all", "day", "week", "month", "year"]),
    author : string().trim().uuid(),
    game : number().min(0),
    reverse : boolean().default(false),
    page : number().default(0).integer().min(0),
    perPage : number().default(PER_PAGE).integer().min(0),
    unlisted : boolean().default(false)
});

export async function GET(request : NextRequest) {
    // get search params
    let searchParams : any;
    try { searchParams = await paramSchema.validate(Object.fromEntries(request.nextUrl.searchParams)); }
    catch (error) { return Response.json({success: false, error:`${error}`}); }
    
    // get client
    const supabase = createClient();

    // construct query
    let { filter, page, perPage, order, author, game, reverse, last, unlisted } = searchParams;
    let query = supabase.from(filter === "following" ? "post_user_like_following_status" : "post_user_like_status").select('*').range(page*perPage,(page+1)*perPage-1);
    if (author) query = query.eq("author", author);
    if (game) query = query.eq("game", game);
    if (last && last !== "all") {
        const today = new Date();
        let days = 1;
        if (last === "week") days = 7;
        else if (last === "month") days = 30;
        else if (last === "year") days = 365;
        const cutoff = new Date(today.getTime() - (24*60*60*1000*days));
        query = query.gte("created_at", cutoff.toISOString());
    }
    if (!unlisted && filter !== "following") query = query.eq("unlisted", false);
    if (order) query = query.order(order, { ascending: reverse });

    // get reviews table
    let reviews : any[];
    try {
        const { data, error } = await query;
        if (!data || error) return Response.json({success: false, error:`Server Error: ${error.message}`});
        reviews = data;
    } catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // edit date info
    reviews.map((review : any) => review.created_at = moment(review.created_at).format('MM/DD/YYYY h:mm a'));

    return Response.json({success:true, data:reviews});
}