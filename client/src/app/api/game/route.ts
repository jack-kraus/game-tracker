// export const dynamic = 'force-dynamic' // defaults to auto
import { headers } from "@/data/api";
import { NextRequest } from "next/server";
import { object, string, number } from 'yup';
import moment from "moment";
import axios from "axios";

const PER_PAGE = 10;
/*const paramSchema = object({
    filter : string().default("none").lowercase().trim().oneOf(["none", "following"]),
    order : string().default("created_at").lowercase().trim().oneOf(["created_at", "likes"]),
    author : string().trim().uuid(),
    game : string().trim().uuid(),
});*/

const paramSchema = object({
  query : string().trim().transform((val) => val.replace("\"", "")).required(),
  page : number().default(0).integer().min(0),
  perPage : number().default(PER_PAGE).integer().min(0),
  order : string().lowercase().trim().oneOf(["created_at", "likes"]),
});

export async function GET(request : NextRequest) {
  // validation schema
  let searchParams : any;
  try { searchParams = await paramSchema.validate(Object.fromEntries(request.nextUrl.searchParams)); }
  catch (error) { return Response.json({success: false, error:`${error}`}); }
  
  // get attributes and construct body
  let { query, page, perPage, order } = searchParams;
  let body = `
    search "${query}";
    fields id, name, summary, cover.image_id, first_release_date, platforms.name; where version_parent = null & category = 0;
    offset ${page*perPage};
    limit ${perPage};
    ${order ? `order ${order};` : ""}
  `;
  
  // get data
  let results : object[];
  try {
    const {data} = await axios.post(
      "https://api.igdb.com/v4/games", body, 
      {
        headers: headers
    });
    results = data;
  } catch(error) {
    return Response.json({success: false, error:`${error}`, body:body});
  }

  // format data in bad formats
  results.forEach((item : any) => {
    if (item.cover) { item.cover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.image_id}.jpg`; }
    if (item.first_release_date) { item.first_release_date = moment.unix(item.first_release_date).format("YYYY"); }
    if (item.platforms) { item.platforms = item.platforms.map((item : {name : string}) => item.name); }
  });

  return Response.json({success:true, data:results});
}