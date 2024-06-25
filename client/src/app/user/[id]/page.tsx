"use client";

import Post from '@/components/items/Post';
import { useQuery } from '@tanstack/react-query';
import React from "react";
import FollowButton from "@/components/ui/FollowButton";
import LoadingHandler from "@/components/ui/LoadingHandler";

export default function Profile({params} : any) {
    let { id } = params;
    if (!id) return <h1>Improper ID</h1>;
    
    const query = useQuery({
        queryKey: ['userProfile'],
        queryFn: () =>
          fetch(`/api/user/${id}`).then((res) =>
            res.json()
          ),
    });
    let { data } = query;
    if (data) data = data.data;

    return <LoadingHandler {...query}>
        <h1 className="text-scale-0 underline">{data?.username}'s Page</h1>
        <FollowButton id={id} following={data?.following}/>
        <div className="flex flex-col gap-3">
            {data?.posts ? data.posts.map((item : any, index:number) => <Post key={index} {...item}/>) : <p>No posts</p>}
        </div>
    </LoadingHandler>;
}