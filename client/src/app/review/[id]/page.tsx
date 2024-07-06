"use server";
import React from "react";
import Stars from "@/components/ui/Stars";
import LikeButton from "@/components/ui/LikeButton";
import { getReviewById } from "@/data/reviews";
import InfiniteScroller from "@/components/ui/InfiniteScroller";
import { number } from "yup";
import CommentForm from "@/components/form/CommentForm";
import { getUserServer } from "@/data/users";
import PostEditDropdown from "@/components/ui/PostEditDropdown";

const gameId = number().required().min(0);
export default async function Review({params} : {params : {id : string}}) {
    // get starting data
    let { id } : {id : string | number } = params;
    try { id = await gameId.validate(id); }
    catch (error) { return <h1 className="text-red-500">Improper ID</h1>; }
    let data : any;
    try { data = await getReviewById(id); }
    catch (e) { return <h1 className="text-red-500">{`${e}`}</h1>; }

    // get current user
    const user = await getUserServer();

    return <>
        <div className="text-white box-item gap-3">
            <div className="w-48">
                <img className="w-full rounded-md hover:brightness-150" src={data?.game_cover} alt={data?.game_title + " cover"}/>
                <cite>{data?.game_title}</cite>
            </div>
            <div className="grow flex flex-col gap-1">
                <h1>{data?.title}</h1>
                <cite>by <a className="link-item" href={`/user/${data?.author}`}>{data?.username}</a> at {data?.created_at}</cite>
                <p>{data?.content}</p>
                <Stars rating={data?.rating}/>
            </div>
            <LikeButton id={id} liked={data?.is_liked} likes={data?.likes}/>
            {user?.id && user.id === data?.author && <PostEditDropdown id={id}/>}
        </div>
        {user && <CommentForm id={id}/>}
        <InfiniteScroller
            title="Comments"
            type="comment"
            route={`/api/review/${id}/comments`}
            keyStart="comments"
        />
    </>;
}