"use server";
import React, { FormEvent, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import Stars from "@/components/ui/Stars";
import { createClient } from "@/utils/supabase/client";
import Comment from "@/components/items/Comment";
import LikeButton from "@/components/ui/LikeButton";
import LoadingHandler from "@/components/ui/LoadingHandler";
import { getReviewById } from "@/data/reviews";
import InfiniteScroller from "@/components/ui/InfiniteScroller";
import { number } from "yup";

const gameId = number().required().min(0);
export default async function Review({params} : {params : {id : string}}) {
    // get starting data
    let { id } : {id : string | number } = params;
    try { id = await gameId.validate(id); }
    catch (error) { return <h1 className="text-red-500">Improper ID</h1>; }
    let data : any;
    try { data = await getReviewById(id); }
    catch (e) { return <h1 className="text-red-500">{e}</h1>; }
    
    const supabase = createClient();
    async function addReview(event : any) {
        "use server";
        event.preventDefault();
        const content = event.target.content.value;
        const { error } = await supabase
            .from('comment')
            .insert({ post: id, content:content });
        if (error) console.log(error);
    }

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
        <h2 className="text-xl text-scale-100 font-bold">Comments</h2>
        <form className="flex w-full" onSubmit={addReview}>
            <textarea name="content" className="w-full input-box rounded-r-none min-h-12" rows={3} required/>
            <button className="primary-button rounded-l-none">Submit</button>
        </form>
        <InfiniteScroller
            title="Comments"
            type="comment"
            route={`/api/review/${id}/comments`}
        />
    </>;
}