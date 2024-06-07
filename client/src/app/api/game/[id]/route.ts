"use client";

// export const dynamic = 'force-dynamic' // defaults to auto
import axios from "axios";
import { headers } from "@/data/api";
import { useParams } from 'next/navigation';

export async function GET() {
  // get id from url
  const params = useParams<{ id: string }>();
  return Response.json(params);

  // get game by id 
  let response, cover_response;
  try {
    response = await axios.post(
      "https://api.igdb.com/v4/games/",
      `fields id, name, summary, cover, first_release_date; where id = ${params.id};`,
      {headers:headers}
    );
    cover_response = await axios.post(
      "https://api.igdb.com/v4/covers/",
      `fields image_id; where game = ${params.id};`,
      {headers:headers}
    );
  } catch(e) {
    return Response.json({success: false, error: e});
  }

  console.log()

  // cover from image_id
  const cover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover_response.data[0].image_id}.jpg`;
  

  let ret = response.data[0];
  ret.cover=cover;
  const date = new Date(ret.first_release_date);
  ret.first_release_date = date.toString();

  return Response.json(ret);
}