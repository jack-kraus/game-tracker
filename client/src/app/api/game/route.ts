
// export const dynamic = 'force-dynamic' // defaults to auto
import axios from "axios";

const headers = {
  'Accept': 'application/json',
  "Client-ID": "xl51rvmx3k6jr00kti7yflg5dv9iv5",
  Authorization: "Bearer ywzm7te3dfktk81btjcm9tve9hle63"
}

export async function GET() {
  let response = await axios.post("https://api.igdb.com/v4/games/", "fields id, name, summary, cover, first_release_date; where id = 1942;", {headers:headers});
  let cover_response = await axios.post("https://api.igdb.com/v4/covers/", "fields image_id; where game = 1942;", {headers:headers});
  //id, name, summary, cover, first_release_date

  const cover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover_response.data[0].image_id}.jpg`;
  

  let ret = response.data[0];
  ret.cover=cover;
  const date = new Date(ret.first_release_date);
  ret.first_release_date = date.toString();

  return Response.json(ret);
}