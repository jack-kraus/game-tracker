// export const dynamic = 'force-dynamic' // defaults to auto
import axios from "axios";
import { headers } from "@/data/api";
import { NextRequest } from "next/server";
import { checkIsProperString } from "@/data/helpers";
import { searchGames } from "@/data/games";

export async function GET(request : NextRequest) {
  // get query text
  let query = request.nextUrl.searchParams.get("query");
  try { query = checkIsProperString(query, 1, true, "query"); }
  catch (error : any) { return Response.json({success: false, error:`${error}`}); }

  // get search results
  let results;
  try { results = await searchGames(query, 100); }
  catch (error : any) { return Response.json({success: false, error:`${error}`}); }

  return Response.json({success:true, results});
}