'use client';

import { useRouter } from "next/navigation";
import Dropdown from "@/components/ui/Dropdown";
import Stars from "@/components/ui/Stars";
import React from "react";
import moment from 'moment';
import { FaUser } from "react-icons/fa";
import { TbUser } from "react-icons/tb";

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
    type? : "game" | "user"
}

export default function Post({ id, title, game, game_title, game_cover, content, rating, created_at, username, author, user_id, type } : postProps) {
    const router = useRouter();

    async function deletePost() {
        if (!confirm("Are you sure you want to delete this post?")) { return; }
        await fetch(`/api/review/${id}`, {
            method: "DELETE"
        }).then(async (res) => {
            const {success, error} = await res.json();
            if (success) router.refresh();
            else if (error) alert(error);
        });
    }

    return (
        <article className="w-full rounded-xl bg-scale-800 text-scale-0 p-3 flex flex-row gap-3 drop-shadow-md">
            {type !== "game" && <div className="w-48">
                <img className="object-contain w-full rounded-md hover:brightness-150" src={game_cover}/>
                <a href={`/game/${game}`}><i className="text-center text-xs link-item">{game_title}</i></a>
            </div>}
            <div className="h-full w-full">
                <a href={`/review/${id}`} className="link-item"><h1>{title}</h1></a>
                <p className="h-full">{content}</p>
                <Stars rating={rating}/>
            </div>
            <cite className="flex flex-col justify-between items-end text-right">
                {type !== "user" && <>
                    <TbUser className="border-opacity-25 bg-scale-500 p-2 rounded-full flex justify-center items-center" size={60} color="white"/>
                    <a className="link-item" href={`/user/${author}`}>{username}</a>
                </>}
                {moment(created_at).format("MM/DD/YY h:mm")}
            </cite>
            {user_id === author ? <Dropdown options={[
                { label : "Edit Post", onClick : () => router.push(`/review/${id}/edit`) },
                { label : "Delete Post", onClick : deletePost }
            ]}/> : <></>}
        </article>
    );
}