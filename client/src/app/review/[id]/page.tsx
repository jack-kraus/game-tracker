"use client";
import React, { FormEvent, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import Stars from "@/components/ui/Stars";
import { createClient } from "@/utils/supabase/client";
import Comment from "@/components/items/Comment";
import LikeButton from "@/components/ui/LikeButton";
import LoadingHandler from "@/components/ui/LoadingHandler";

export default function ReviewPage({params} : any) {
    const [updated, setUpdated] = useState(0);
    const update = () => setUpdated(updated + 1);
    
    let { id } = params;
    if (!id) return <h1>Improper ID</h1>;

    const query = useQuery({
        queryKey: ['repoData', updated],
        queryFn: () =>
          fetch(`/api/review/${id}`).then((res) =>
            res.json()
          ),
    });
    let { data } = query;

    const supabase = createClient();
    async function addReview(event : any) {
        event.preventDefault();
        const content = event.target.content.value;
        const { error } = await supabase
            .from('comment')
            .insert({ post:id, content:content });
        if (error) console.log(error);
        else update();
    }

    if (data) data = data.data;
    return  <LoadingHandler {...query}>
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
        {data?.comments && data.comments.map((item : any) => <Comment {...item}/>)}
    </LoadingHandler>;
}