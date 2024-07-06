// export const dynamic = 'force-dynamic' // defaults to auto
import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { number, object } from "yup";

const PER_PAGE = 10;
const paramSchema = object({
    page : number().default(0).integer().min(0),
    perPage : number().default(PER_PAGE).integer().min(0),
});

export async function GET(request : NextRequest, {params} : {params : {id: string}}) {
    // check id param
    const idSchema = number().required().positive();
    let review_id : number | string = params.id;
    try { review_id = await idSchema.validate(review_id); }
    catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // get search params
    let searchParams : any;
    try { searchParams = await paramSchema.validate(Object.fromEntries(request.nextUrl.searchParams)); }
    catch (error) { return Response.json({success: false, error:`${error}`}); }
    let {page, perPage} = searchParams;

    // get client
    const supabase = createClient();

    // get comments
    try {
        const { data, error } = await supabase
            .from('comment_user')
            .select('*')
            .eq('post', review_id)
            .range(page*perPage,(page+1)*perPage-1);;
        if (error) throw error;
        return Response.json({success:true, data:data});
    } catch (error : any) {
        return Response.json({success: false, error:`${error}`});
    }
}