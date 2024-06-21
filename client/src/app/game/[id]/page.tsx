"use client";
import React from "react";
import { useQueries } from '@tanstack/react-query';
import LoadingHandler from "@/components/ui/LoadingHandler";
import Post from "@/components/items/Post";

export default function GamePage({params} : any) {
    let { id } = params;
    if (!id) return <h1>Improper ID</h1>;

    const [query1, query2] = useQueries({
        queries: [
            { queryKey: ['game'], queryFn: () => fetch(`/api/game/${id}`).then((res) => res.json()) },
            { queryKey: ['reviews'], queryFn: () => fetch(`/api/game/${id}/reviews`).then((res) => res.json()) },
        ],
    });
    let { data:game } = query1;
    let { data:reviews } = query2;

    if (game) game = game.results;
    return  <>
        <LoadingHandler {...query1}>
            <article className="box-item gap-3">
                <img src={game?.cover} className="w-48 object-contain"/>
                <div>
                    <h1>{game?.name}</h1>
                    <h2 className="font-bold">Summary</h2>
                    <p>{game?.summary}</p>
                    <h2 className="font-bold">Genres</h2>
                    {game?.genres ? <ol className="list-disc list-inside">{game.genres.map((item : string, i:number) => <li key={i}>{item}</li>)}</ol> : <></>}
                    <h2 className="font-bold">Platforms</h2>
                    {game?.platforms ? <ol className="list-disc list-inside">{game.platforms.map((item : string, i:number) => <li key={i}>{item}</li>)}</ol> : <></>}
                </div>
            </article>
        </LoadingHandler>
        <LoadingHandler {...query2}>
            <h2 className="font-bold text-scale-0">Reviews</h2>
            {reviews && reviews.data ? reviews.data.map((item : any, index:number) => <Post key={index} {...item}/>) : <></>}
        </LoadingHandler>
    </>;
}