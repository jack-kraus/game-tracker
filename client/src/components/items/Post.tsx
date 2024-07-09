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
        <article className="box-item gap-3">
            {type !== "game" && <a className="sm:w-32 w-16 shrink-0 group text-center" href={`/game/${game}`}>
                <img className="object-contain w-full rounded-md group-hover:brightness-150" src={game_cover} alt={game_title + " cover"}/>
                <cite className="group-link-item text-sm text-end">{game_title}</cite>
            </a>}
            <div className="h-full w-full flex flex-col gap-1">
                <a href={`/review/${id}`} className="link-item"><h1>{title}</h1></a>
                <SeeMore lines={5}>{content}</SeeMore>
                <Stars rating={rating}/>
            </div>
            <cite className="flex flex-col justify-start items-end text-right gap-3">
                {type !== "user" && <a className="flex flex-col items-end gap-1 group" href={`/user/${author}`}>
                    <FaUser size={60} className="p-2 bg-scale-500 text-scale-0 rounded-full group-hover:rounded-3xl object-contain group-hover:bg-scale-0 group-hover:text-scale-500"/>
                    <p className="group-link-item">{username}</p>
                </a>}
                {moment(created_at).format("MM/DD/YY h:mm")}<LikeButton id={id} liked={is_liked} likes={likes}/>
            </cite>
            {session?.user?.id === author && <PostEditDropdown id={id}/>}
        </article>
    );
}