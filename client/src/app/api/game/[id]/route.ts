// export const dynamic = 'force-dynamic' // defaults to auto
import { NextRequest } from "next/server";
import { checkIsProperString } from "@/data/helpers";
import { searchGameById } from "@/data/games";

export async function GET(_request : NextRequest , {params} : {params : {id: string}}) {
  // get game by id
  let id = params.id;
  try { id = checkIsProperString(id, 1, true, "query"); }
  catch (error : any) { return Response.json({success: false, error:`${error}`}); }

  // get result
  let results;
  try { results = await searchGameById(id); }
  catch (error : any) { return Response.json({success: false, error:`${error}`}); }
  
  return Response.json({success:true, results});
}