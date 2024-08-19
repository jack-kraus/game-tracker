import React, { cache, ReactNode } from "react";
import {number} from "yup";
import { searchGameById } from "@/data/games";
import InfiniteScroller from "@/components/ui/InfiniteScroller";
import { BsNintendoSwitch, BsJoystick, BsPlusCircleFill } from "react-icons/bs";
import Link from "next/link";
import { SiAtari, SiCommodore, SiNintendo, SiNintendogamecube, SiWii, SiWiiu } from "react-icons/si";
import { FaApple, FaPlaystation, FaWindows, FaXbox } from "react-icons/fa";
import { SiNintendo3Ds } from "react-icons/si";
import SeeMore from "@/components/ui/SeeMore";

const gameId = number().min(0).required();

const gameById = cache(async (id : string | number) => {
    try { id = await gameId.validate(id); }
    catch(e) { throw "Improper Id"; }
    const game = await searchGameById(id);
    return { game, id }
});

export async function generateMetadata({ params } : any) {
    let { id } = params;
    let game : any;
    try { ({game, id} = await gameById(id)); }
    catch (e) { return { title : "Error | Leveler", description: e }; }

    return { title: `${game.name} | Game | Leveler`, description: game.summary ?? "" }
}

export default async function GamePage({params} : any) {
    let { id } = params;
    let game : any;
    try { ({game, id} = await gameById(id)); }
    catch (error) { return <h1 className="text-red-500">{error}</h1>; }
    
    return  <>
        <article className="box-item gap-5 flex-col items-center sm:items-start">
            <h1>{game.name}</h1>
            <div className="flex sm:flex-row flex-col gap-5">
                <div className="sm:w-48 w-full flex items-center gap-3 flex-col h-auto shrink-0">
                    <img className="sm:w-full w-48 object-contain rounded-md hover:brightness-150" src={game?.cover}/>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3 whitespace-pre-line">
                        <h2 className="font-bold">Summary</h2>
                        <SeeMore>
                            {game.summary}
                        </SeeMore>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <h2 className="font-bold">Platforms</h2>
                        <h2 className="font-bold">Genres</h2>
                        {game.platforms ? <ol className="list-disc list-inside">{game.platforms.map((item : string, i:number) => PlatformItem(item, i))}</ol> : <></>}
                        {game.genres ? <ol className="list-disc list-inside">{game.genres.map((item : string, i:number) => <li key={i}>{item}</li>)}</ol> : <></>}
                    </div>
                </div>
                <Link href={{
                        pathname: '/post',
                        query: { id: id, name: game.name },
                    }}
                    className="text-white hover:text-primary hover:bg-white bg-primary h-7 grow-0 px-2 rounded-md flex justify-center items-center transition-colors w-full sm:w-auto"
                >
                    <BsPlusCircleFill/>
                </Link>
            </div>
        </article>
        <InfiniteScroller
            title="Reviews"
            type="post_game"
            reverseSelector={true}
            options={{
                game: id
            }}
            optionSelectors={{
                order: ["created_at", "likes", "rating"],
                last: ["all", "day", "week", "month"]
            }}
        />
    </>;
}

function PlatformItem(name : string, i : number) {
    let icon : null | ReactNode = <></>;
    const lower = name.toLowerCase();
    if (lower.startsWith("xbox"))                               { icon = <FaXbox color="white" className="p-0 m-0 inline"/>; }
    else if (lower.startsWith("playstation"))                   { icon = <FaPlaystation color="white" className="p-0 m-0 inline"/>; }
    else if (lower.startsWith("pc"))                            { icon = <FaWindows color="white" className="p-0 m-0 inline"/>; }
    else if (lower.startsWith("mac"))                           { icon = <FaApple color="white" className="p-0 m-0 inline"/>; }
    else if (lower.startsWith("nintendo switch"))               { icon = <BsNintendoSwitch color="white" className="p-0 m-0 inline"/>; }
    else if (lower.startsWith("nintendo gamecube"))             { icon = <SiNintendogamecube color="white" className="p-0 m-0 inline"/>; }
    else if (lower.startsWith("atari"))                         { icon = <SiAtari color="white" className="p-0 m-0 inline"/>; }
    else if (lower.startsWith("commodore"))                     { icon = <SiCommodore color="white" className="p-0 m-0 inline"/>; }
    else if (lower.startsWith("arcade"))                        { icon = <BsJoystick color="white" className="p-0 m-0 inline"/>; }
    else if (["nintendo 3ds", "nintendo ds"].includes(lower))   { icon = <SiNintendo3Ds color="white" className="p-0 m-0 inline"/>; }
    else if (lower === "wii u")                                 { icon = <SiWiiu color="white" className="p-0 m-0 inline"/>; }
    else if (lower === "wii")                                   { icon = <SiWii color="white" className="p-0 m-0 inline"/>; }
    return <li key={`platform:${i}`}>{icon}{icon ? " " : ""}{name}</li>
}