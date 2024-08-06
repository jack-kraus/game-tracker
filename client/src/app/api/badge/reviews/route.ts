import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { abbreviateNumber } from "js-abbreviation-number";

export async function GET(_request : NextRequest) {
    // get client
    const supabase = createClient();

    // get reviews table
    let post_count : number | null;
    try {
        const { count, error } = await supabase.from("post").select('*', { count: 'estimated', head: true });
        if (error) throw null;
        if (count === null) throw null;
        post_count = count;
    } catch (error : any) {
        return Response.json({ schemaVersion: 1, label: "total reviews", message: "check back later", color: "orange" });
    }

    return Response.json({ schemaVersion: 1, label: "total reviews", message: abbreviateNumber(post_count), color: "blue" });
}