import React from "react";
import {number} from "yup";
import { searchGameById } from "@/data/games";
import InfiniteScroller from "@/components/ui/InfiniteScroller";
import { BsPlusCircleFill } from "react-icons/bs";
import Link from "next/link";

const gameId = number().required();

export default async function GamePage({params} : any) {
    let { id } = params;
    try { id = await gameId.validate(id); }
    catch (error) { return <h1 className="text-red-500">Improper ID</h1>; }
    let game;
    try { game = await searchGameById(id); }
    catch (error) { return <h1 className="text-red-500">{error}</h1>; }
    
    return  <>
        <article className="box-item gap-5">
            <div className="flex items-center w-48 h-auto shrink-0">
                <img className="object-contain w-full rounded-md" src={game?.cover}/>
            </div>
            <div className="flex flex-col gap-3">
                <h1>{game.name}</h1>
                <p>
                    <h2 className="font-bold">Summary</h2>
                    {game.summary}
                </p>
                <div className="grid grid-cols-2">
                    <div>
                        <h2 className="font-bold">Platforms</h2>
                        {game.platforms ? <ol className="list-disc list-inside">{game.platforms.map((item : string, i:number) => <li key={i}>{item}</li>)}</ol> : <></>}
                    </div>
                    <div>
                        <h2 className="font-bold">Genres</h2>
                        {game.genres ? <ol className="list-disc list-inside">{game.genres.map((item : string, i:number) => <li key={i}>{item}</li>)}</ol> : <></>}
                    </div>
                </div>
            </div>
            <Link href={{
                    pathname: '/post',
                    query: { id: id, name: game.name },
                }}
                className="text-white hover:text-primary hover:bg-white bg-primary h-7 grow-0 px-2 rounded-md flex justify-center items-center transition-colors"
            >
                <BsPlusCircleFill/>
            </Link>
        </article>
        <InfiniteScroller
            title="Reviews"
            type="post_game"
            options={{
                game: id
            }}
        />
    </>;
}