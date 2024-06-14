// export const dynamic = 'force-dynamic' // defaults to auto
import { NextRequest } from "next/server";
import { checkIsProperString, schema } from "@/data/helpers";
import { searchGameById } from "@/data/games";
import { createClient } from "@/utils/supabase/server";

export async function POST(request : NextRequest, {params} : {params : {id: string}}) {
    // check param
    let game_id = params.id;
    try { game_id = checkIsProperString(game_id, 1, true, "query"); }
    catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // get game by id
    let game;
    try { game = await searchGameById(game_id); }
    catch (error : any) { return Response.json({success: false, error:`${error}`}); }

    // get user
    const supabase = createClient();
    const user_object = await supabase.auth.getUser();
    if (!user_object || !user_object.data || !user_object.data.user) return Response.json({success: false, error:`User not found`});
    const user_id = user_object.data.user.id;

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