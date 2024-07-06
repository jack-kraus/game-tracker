// export const dynamic = 'force-dynamic' // defaults to auto
import { NextRequest } from "next/server";
import { schema } from "@/data/helpers";
import { searchGameById } from "@/data/games";
import { createClient } from "@/utils/supabase/server";
export const dynamic = 'force-dynamic';
export async function POST(request : NextRequest, {params} : {params : {id: string}}) {
    // check param
    let game_id:  string | number = params.id;
    try { game_id = await schema.numberIdSchema.validate(game_id) }
    catch (error : any) { return Response.json({success: false, error: error.errors.join(",")}); }

    // get user
    const supabase = createClient();
    const user_object = await supabase.auth.getUser();
    if (!user_object || !user_object.data || !user_object.data.user) return Response.json({success: false, error:`User not found`});
    const user_id = user_object.data.user.id;
    
    // get game by id
    let game : any;
    try { game = await searchGameById(game_id); }
    catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // validate body
    let body = await request.json();
    body = {...body, game : game_id, game_title : game.name, game_cover : game.cover, author : user_id }
    try { body = await schema.reviewSchema.validate(body); }
    catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // insert item
    const { error } = await supabase.from('post').insert(body);
    if (error) return Response.json({success: false, error:`${error}`});

    // return success
    return Response.json({success:true});
}