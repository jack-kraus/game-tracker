"use client";

import { logout } from "../../data/actions";
import Post from '@/components/items/Post';
import { useQuery } from "@tanstack/react-query";
import LoadingHandler from "@/components/ui/LoadingHandler";

export default function Profile() {
    const query = useQuery({
        queryKey: ['userProfile'],
        queryFn: () =>
          fetch(`/api/user/current`).then((res) =>
            res.json()
          ),
    });
    let { data } = query;
    if (data) data = data.data;

    return <LoadingHandler {...query}>
        <h1 className="text-scale-0 underline">{data?.username}'s Page</h1>
        <button formAction={logout} className='primary-button'>Log-Out</button>
        <div className="flex flex-col gap-3">
            {data?.posts ? data.posts.map((item : any, index:number) => <Post key={index} {...item}/>) : <p>No posts</p>}
        </div>
    </LoadingHandler>;
}