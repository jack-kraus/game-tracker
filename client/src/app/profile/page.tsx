"use client";

import { logout } from "@/data/actions";
import Post from '@/components/items/Post';
import { useQuery } from "@tanstack/react-query";
import LoadingHandler from "@/components/ui/LoadingHandler";
import { useRouter } from 'next/navigation';

export default function Profile() {
    const query = useQuery({
        queryKey: ['userProfile'],
        queryFn: () =>
          fetch(`/api/user/current`).then((res) =>
            res.json()
          ),
    });
    const router = useRouter();
    let { data } = query;
    if (data) {
        if (data.error) { router.push("/login"); return <></>; }
        else { data = data.data; }
    }

    return <LoadingHandler {...query}>
        <h1 className="text-scale-0 underline">{data?.username}'s Page</h1>
        <button onClick={() => {logout()}} className='primary-button'>Log-Out</button>
        <button onClick={() => {router.push("/profile/edit")}} className='primary-button'>Edit-Profile</button>
        <div className="flex flex-col gap-3">
            {data?.posts ? data.posts.map((item : any, index:number) => <Post key={index} {...item} user_id={data.id}/>) : <p>No posts</p>}
        </div>
    </LoadingHandler>;
}