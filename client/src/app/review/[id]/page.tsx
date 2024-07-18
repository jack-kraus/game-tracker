"use server";
import React, { cache } from "react";
import Stars from "@/components/ui/Stars";
import LikeButton from "@/components/ui/LikeButton";
import { getReviewById } from "@/data/reviews";
import InfiniteScroller from "@/components/ui/InfiniteScroller";
import CommentForm from "@/components/form/CommentForm";
import { getUserServer } from "@/data/users";
import PostEditDropdown from "@/components/ui/PostEditDropdown";
import { schema } from "@/data/helpers";
import { FaUser } from "react-icons/fa";
import moment from "moment";

const reviewById = cache(async (id : string | number) => {
    // get starting data
    try { id = await schema.numberIdSchema.validate(id); }
    catch (error) { throw "Improper ID"; }
    let data : any;
    try { data = await getReviewById(id); }
    catch (e) { throw "Issue finding Review"; }
    
    // return data
    return { data, id };
});

export async function generateMetadata({ params } : any) {
    let { id } = params;
    let data;
    try { ({ data, id } = await reviewById(id)); }
    catch (error) { return { title: `Error | Leveler` } }

    return { title: `${data?.title} | Review | Leveler` }
}

export default async function Review({params} : {params : {id : string | number}}) {
    // get starting data
    let { id } = params;
    let data;
    try { ({ data, id } = await reviewById(id)); }
    catch (error) { return <h1 className="text-red-500">{error}</h1> }


    // get current user
    const user = await getUserServer();

    return <>
        <div className="text-white box-item gap-3 flex-row mb-3">
            <div className="flex sm:flex-row flex-row-reverse gap-3 w-full">
                <a className="sm:w-32 w-16 shrink-0 group text-center" href={`/game/${data?.game}`}>
                    <img className="w-full rounded-md group-hover:brightness-150" src={data?.game_cover} alt={data?.game_title + " cover"}/>
                    <cite className="group-link-item text-sm text-end">{data?.game_title}</cite>
                </a>
                <div className="grow flex flex-col gap-2">
                    <h1>{data?.title}</h1>
                    <div className="flex gap-1">
                        <p className="text-scale-300">by</p>
                        <a href={`/user/${data?.author}`} className="group w-auto inline-flex gap-1 items-center self-start">
                            <FaUser size={20} className="p-1  bg-scale-500 text-scale-0 rounded-full group-hover:rounded-3xl object-contain group-hover:bg-scale-0 group-hover:text-scale-500"/>
                            <p className="group-link-item break-words">{data?.username}</p>
                        </a>
                        <p className="text-scale-300">on {moment(data?.created_at).format("MM/DD/YY")}</p>
                    </div>
                    <p className="whitespace-pre-line">{data?.content}</p>
                    <Stars rating={data?.rating}/>
                </div>
                <LikeButton id={id} liked={data?.is_liked} likes={data?.likes}/>
            </div>
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