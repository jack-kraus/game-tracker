import { header_func, headers } from "./api";
import axios from 'axios';
import { checkIsProperString } from "./helpers";

async function searchGames(query : string, limit : number) {
    query = checkIsProperString(query, 1, true, "query");
    
    let response;
    response = await axios.post(
        "https://api.igdb.com/v4/games/",
        `search "${query}"; fields id, name, summary, cover.image_id, first_release_date; limit ${limit};`,
        {headers:headers}
    );
    
    response.data.forEach((item : any) => {
        if (item.cover) {
            item.cover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.image_id}.jpg`;
        };
    });

    return response.data;
}

async function searchGameById(id : string) {
    let response = await axios.post(
        "https://api.igdb.com/v4/games/",
        `fields id, name, summary, cover.image_id, first_release_date, genres.name, platforms.name; where id = ${id}; limit 1;`,
        {headers:headers}
    );
    let data = response.data as any[];

    if (data.length === 0) throw "No Results found";
    
    const result = data[0];
    if (result.cover) result.cover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${result.cover.image_id}.jpg`;
    if (result.genres) result.genres = result.genres.map((item : {id: number, name: string}) => item.name).filter((item : string | undefined) => item);
    if (result.platforms) result.platforms = result.platforms.map((item : {id: number, name: string}) => item.name).filter((item : string | undefined) => item);
    
    return result;
}

export { searchGames, searchGameById };