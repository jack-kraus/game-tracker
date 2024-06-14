// export const dynamic = 'force-dynamic' // defaults to auto
import axios from "axios";
import { headers } from "@/data/api";
import { NextRequest } from "next/server";
import { checkIsProperString } from "@/data/helpers";
import { searchGames } from "@/data/games";

export async function GET(request : NextRequest) {
  // get query text
  let query = request.nextUrl.searchParams.get("query") as string;
  try { query = checkIsProperString(query, 1, true, "query"); }
  catch (error : any) { return Response.json({success: false, error:`${error}`}); }

  let limit = request.nextUrl.searchParams.get("limit");
  let limit_num = 100;
  if (limit) limit_num = parseInt(limit);

  // get search results
  let results;
  try { results = await searchGames(query, limit_num); }
  catch (error : any) { return Response.json({success: false, error:`${error}`}); }

  return Response.json({success:true, results});
}