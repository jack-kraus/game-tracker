// export const dynamic = 'force-dynamic' // defaults to auto
import { NextRequest } from "next/server";
import { schema } from "@/data/helpers";
import { searchGameById } from "@/data/games";

export async function GET(_request : NextRequest , {params} : {params : {id: string}}) {
  // get game by id
  let id : string | number = params.id;
  try { id = await schema.numberIdSchema.validate(id) }
  catch (error : any) { return Response.json({success: false, error: error.errors.join(",")}); }

  // get result
  let results : object[];
  try { results = await searchGameById(id); }
  catch (error : any) { return Response.json({success: false, error:`${error}`}); }
  
  // return result
  return Response.json({success:true, results: results});
}