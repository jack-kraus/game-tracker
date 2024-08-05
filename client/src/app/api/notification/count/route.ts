import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { object, boolean } from 'yup';

export const dynamic = 'force-dynamic';

const paramSchema = object({
    notMe : boolean().default(false),
    notRead : boolean().default(true)
});

export async function GET(request : NextRequest) {
    // get search params
    let searchParams : any;
    try { searchParams = await paramSchema.validate(Object.fromEntries(request.nextUrl.searchParams)); }
    catch (error) { return Response.json({success: false, error:`${error}`}); }
    
    // get client
    const supabase = createClient();

    // construct query
    let { notMe, notRead } = searchParams;
    let query = supabase.from(notMe ? "notification_mine_notme" : "notification_mine").select('*', { count: 'exact', head: true });
    if (notRead) query = query.eq('read', false);

    // get reviews table
    let notification_count : number;
    try {
        const { count, error } = await query;
        if (error) return Response.json({success: false, error:`Server Error: ${error.message}`});
        notification_count = count ?? 0;
    } catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    return Response.json({success:true, data:notification_count});
}