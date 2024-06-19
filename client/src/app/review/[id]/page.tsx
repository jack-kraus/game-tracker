"use client";
/*

let review_id = params.id;
    try { review_id = checkIsProperString(review_id, 1, true, "query"); }
    catch (error : any) { return Response.json({success: false, step: "Validate ID", error:`${error}`}); }

*/
import React, { FormEvent, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import Stars from "@/components/Stars";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { createClient } from "@/utils/supabase/client";
import Comment from "@/components/Comment";

export default function ReviewPage({params} : any) {
    const [updated, setUpdated] = useState(0);
    const update = () => setUpdated(updated + 1);
    
    let { id } = params;
    if (!id) return <h1>Improper ID</h1>;

    let { isPending, error, data } = useQuery({
        queryKey: ['repoData', updated],
        queryFn: () =>
          fetch(`/api/review/${id}`).then((res) =>
            res.json()
          ),
    });

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
    
    
    if (isPending) return <h1>Pending...</h1>;
    else if (error) return <h1>{error.message}</h1>;

    if (data.success) data = data.data;
    else return <h1>Hello{data.message}</h1>;

    return  <>
        <div className="text-white box-item gap-3">
            <div>
                <img className="w-48" src={data.game_cover} alt={data.game_title + " cover"}/>
                <cite>{data.game_title}</cite>
            </div>
            <div>
                <h1>{data.title}</h1>
                <cite>by {data.author} at {data.created_at}</cite>
                <p>{data.content}</p>
                <Stars rating={data.rating}/>
            </div>
            <div className="flex flex-row justify-end gap-2"><BsHeartFill className={data.liked ? "text-primary" : "text-scale-1000"}/> <p>{data.likes}</p></div>
        </div>
        <h2 className="text-xl text-scale-100 font-bold">Comments</h2>
        <form className="flex w-full" onSubmit={addReview}>
            <textarea name="content" className="w-full input-box rounded-r-none min-h-12" rows={3} required/>
            <button className="primary-button rounded-l-none">Submit</button>
        </form>
        {data.comments ? data.comments.map((item : any) => <Comment {...item}/>) : <></>}
    </>;
}