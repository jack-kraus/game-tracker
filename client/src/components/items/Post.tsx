'use client';

import { useRouter } from "next/navigation";
import Dropdown from "@/components/ui/Dropdown";
import Stars from "@/components/ui/Stars";
import React from "react";
import moment from 'moment';
import { TbUser } from "react-icons/tb";
import LikeButton from "../ui/LikeButton";
import { useUser } from "@/context/AuthProvider";
import PostEditDropdown from "../ui/PostEditDropdown";

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
        <article className="w-full rounded-xl bg-scale-800 text-scale-0 p-3 flex flex-row gap-3 drop-shadow-md">
            {type !== "game" && <div className="w-48">
                <img className="object-contain w-full rounded-md hover:brightness-150" src={game_cover}/>
                <a href={`/game/${game}`}><i className="text-center text-xs link-item">{game_title}</i></a>
            </div>}
            <div className="h-full w-full flex flex-col gap-1">
                <a href={`/review/${id}`} className="link-item"><h1>{title}</h1></a>
                <p className="h-full">{content ? content.substring(0,200) : ""}{content && content.length > 200 ? "..." : ""}</p>
                <Stars rating={rating}/>
            </div>
            <cite className="flex flex-col justify-between items-end text-right">
                {type !== "user" && <>
                    <TbUser className="border-opacity-25 bg-scale-500 p-2 rounded-full flex justify-center items-center" size={60} color="white"/>
                    <a className="link-item" href={`/user/${author}`}>{username}</a>
                </>}
                {moment(created_at).format("MM/DD/YY h:mm")}<LikeButton id={id} liked={is_liked} likes={likes}/>
            </cite>
            {session?.user?.id === author && <PostEditDropdown id={id}/>}
        </article>
    );
}