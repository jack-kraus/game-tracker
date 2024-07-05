"use server";
import React, { FormEvent, useState } from "react";
import Stars from "@/components/ui/Stars";
import { createClient } from "@/utils/supabase/client";
import LikeButton from "@/components/ui/LikeButton";
import { getReviewById } from "@/data/reviews";
import InfiniteScroller from "@/components/ui/InfiniteScroller";
import { number } from "yup";
import CommentForm from "@/components/form/CommentForm";
import { getUserServer } from "@/data/users";

const gameId = number().required().min(0);
export default async function Review({params} : {params : {id : string}}) {
    // get starting data
    let { id } : {id : string | number } = params;
    try { id = await gameId.validate(id); }
    catch (error) { return <h1 className="text-red-500">Improper ID</h1>; }
    let data : any;
    try { data = await getReviewById(id); }
    catch (e) { return <h1 className="text-red-500">{e}</h1>; }

    // get current user
    const user = await getUserServer();

    return <>
        <div className="text-white box-item gap-3">
            <div>
                <img className="w-48" src={data?.game_cover} alt={data?.game_title + " cover"}/>
                <cite>{data?.game_title}</cite>
            </div>
            <div className="grow">
                <h1>{data?.title}</h1>
                <cite>by <a href={`/user/${data?.author}`}>{data?.username}</a> at {data?.created_at}</cite>
                <p>{data?.content}</p>
                <Stars rating={data?.rating}/>
            </div>
            <LikeButton id={id} liked={data?.liked} likes={data?.likes}/>
        </div>
        {user && <CommentForm id={id}/>}
        <InfiniteScroller
            title="Comments"
            type="comment"
            route={`/api/review/${id}/comments`}
        />
    </>;
}