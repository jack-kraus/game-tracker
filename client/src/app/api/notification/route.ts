import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { object, number, boolean } from 'yup';
export const dynamic = 'force-dynamic';
const PER_PAGE = 10;
const paramSchema = object({
    page : number().default(0).integer().min(0),
    perPage : number().default(PER_PAGE).integer().min(0),
    notMe : boolean().default(true)
});

export async function GET(request : NextRequest) {
    // get search params
    let searchParams : any;
    try { searchParams = await paramSchema.validate(Object.fromEntries(request.nextUrl.searchParams)); }
    catch (error) { return Response.json({success: false, error:`${error}`}); }
    
    // get client
    const supabase = createClient();

    // construct query
    let { page, perPage, notMe } = searchParams;
    let query = supabase.from(notMe ? "notification_mine_notme" : "notification_mine").select('*').range(page*perPage,(page+1)*perPage-1).order("created_at", { ascending: false });

    // get reviews table
    let notifications : any[];
    try {
        const { data, error } = await query;
        if (!data || error) return Response.json({success: false, error:`Server Error: ${error.message}`});
        notifications = data;
    } catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // set to read
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user?.id) throw "no user found";
        console.log(user?.id);

        const { error } = await supabase
            .from("notification")
            .update({ read: true })
            .eq('user_id', user.id);
        if (error) throw error.message;
    } catch(e) { console.error(e); }

    return Response.json({success:true, data:notifications});
}