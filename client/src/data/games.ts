import { headers } from "./api";
import axios from 'axios';
import { checkIsProperString } from "./helpers";

async function searchGames(query : string, limit : number) {
    query = checkIsProperString(query, 1, true, "query");
    
    console.log(headers);
    let response;
    response = await axios.post(
        "https://api.igdb.com/v4/games/",
        `search "${query}"; fields id, name, summary, cover.image_id, first_release_date; limit ${limit};`,
        {headers:headers}
    );
    
    response.data.forEach((item : any) => {
        if (item.cover) item.cover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.image_id}.jpg`;
    });

    return response.data;
}

export { searchGames };