'use client';

import { useRouter } from "next/navigation";
import Dropdown from "@/components/ui/Dropdown";
import Stars from "@/components/ui/Stars";
import LikeButton from "../ui/LikeButton";
import moment from 'moment';

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
    mine :boolean
}

export default function Post({ id, title, game, game_title, game_cover, content, rating, created_at, username, author, mine } : postProps) {
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
            <div>
                <img className="w-32 rounded-md hover:brightness-150" src={game_cover}/>
                <a href={`/game/${game}`}><i className="text-center text-xs hover:text-primary">{game_title}</i></a>
            </div>
            <div className="h-full w-full">
                <a href={`/review/${id}`} className="hover:text-primary active:text-white"><h1>{title}</h1></a>
                <p className="h-full">{content}</p>
                <Stars rating={rating}/>
            </div>
            <cite className="flex flex-col justify-between items-end text-right">
                <p className="bg-scale-200 w-12 h-12 rounded-full"/>
                <a className="hover:text-primary active:text-white" href={`/user/${author}`}>{username}</a>
                <br/>
                {moment(created_at).format("MM/DD/YY h:mm")}
            </cite>
            {mine ? <Dropdown options={[
                { label : "Edit Post", onClick : () => alert("Edit!") },
                { label : "Delete Post", onClick : deletePost }
            ]}/> : <></>}
        </article>
    );
}