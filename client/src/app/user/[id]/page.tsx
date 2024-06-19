"use client";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Post from '@/components/items/Post';
import { useQuery } from '@tanstack/react-query';
import React from "react";

export default function Profile({params} : any) {
    let { id } = params;
    if (!id) return <h1>Improper ID</h1>;
    
    let { isPending, error, data } = useQuery({
        queryKey: ['userProfile'],
        queryFn: () =>
          fetch(`/api/user/${id}`).then((res) =>
            res.json()
          ),
    });
    

    if (isPending) return <h1>Pending...</h1>;
    else if (error) return <h1>{`${error}`}</h1>;
    data = data.data;

    return <>
        <h1 className="text-scale-0 underline">{data.username}'s Page</h1>
        <button type="button" className="primary-button" onClick={()=>alert("hello")}>Follow</button>
        <div className="flex flex-col gap-3">
                {data.posts ? data.posts.map((item : any, index:number) => <Post key={index} {...{...item, author:"Steve"}}/>) : <p>No posts</p>}
        </div>
    </>;
}