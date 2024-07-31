'use client';

import Stars from "@/components/ui/Stars";
import React from "react";
import moment from 'moment';
import LikeButton from "../ui/LikeButton";
import { useUser } from "@/context/AuthProvider";
import PostEditDropdown from "../ui/PostEditDropdown";
import SeeMore from "../ui/SeeMore";
import { FaUser } from "react-icons/fa";

interface postProps {
    title: string,
    content: string,
    rating: number,
    author: string,
    created_at: string,
    game: number,
    game_title: string,
    game_cover: string,
    id : number,
    username : string,
    user_id : string,
    type? : "game" | "user",
    is_liked : boolean,
    likes : number
}

export default function Post({ id, title, game, game_title, game_cover, content, rating, created_at, username, author, type, likes, is_liked } : postProps) {
    const { session } = useUser();
    

    return (
        <article className="box-item gap-2 sm:gap-3">
            {type !== "game" && <a className="sm:w-32 w-16 shrink-0 group text-center" href={`/game/${game}`}>
                <img className="object-contain w-full rounded-md group-hover:brightness-150" src={game_cover} alt={game_title + " cover"}/>
                <cite className="group-link-item break-words hyphens-auto text-sm text-end">{game_title}</cite>
            </a>}
            <div className="h-full w-full inline-flex flex-col justify-start sm:gap-2 gap-1.5">
                <a href={`/review/${id}`} className="link-item self-start break-words"><h1>{title}</h1></a>
                <div className="flex gap-1 flex-wrap">
                    {type !== "user" && <><p className="text-scale-300">by</p>
                    <a href={`/user/${author}`} className="group w-auto inline-flex gap-1 items-center self-start flex-wrap">
                        <FaUser size={20} className="p-1  bg-scale-500 text-scale-0 rounded-full group-hover:rounded-3xl object-contain group-hover:bg-scale-0 group-hover:text-scale-500"/>
                        <p className="group-link-item break-words">{username}</p>
                    </a></>}
                    <p className="text-scale-300">{moment(created_at).format("MM/DD/YY")}</p>
                </div>
                <SeeMore>{content}</SeeMore>
                <Stars rating={rating}/>
            </div>
            <div className="flex flex-col justify-center gap-1 items-end self-start">
                {session?.user?.id === author && <PostEditDropdown id={id}/>}
                <LikeButton id={id} liked={is_liked} likes={likes}/>
            </div>
        </article>
    );
}