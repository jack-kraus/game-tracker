import React from "react";
import FollowButton from "@/components/ui/FollowButton";
import InfiniteScroller from '@/components/ui/InfiniteScroller';
import {getUserByIdServer} from "@/data/users";
import { schema } from "@/data/helpers";
import { TbUser } from "react-icons/tb";

export default async function Profile({params} : any) {
    let { id } = params;
    try { id = await schema.uuidSchema.validate(id); }
    catch (error) { return <h1>Improper ID</h1>; }
    const data = await getUserByIdServer(id);

    return <>
        <div className="box-item flex-col max-w-xs gap-3 items-center">
            <h1 className="text-scale-0 underline">{data?.username}'s Page</h1>
            <TbUser className="border-opacity-25 transition-all bg-scale-500 p-2 rounded-full flex justify-center items-center" size={80} color="white"/>
            <table className="table-fixed border-spacing-2 text-scale-0 w-3/4">
                <thead>
                    <tr>
                        <th>Followers</th>
                        <th>Following</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{data?.followers}</th>
                        <th>{data?.following}</th>
                    </tr>
                </tbody>
            </table>
            <FollowButton id={id} following={data?.is_following}/>
        </div>
        <InfiniteScroller title="Top Posts" type="post_user" options={{
            author : id,
        }}/>
    </>;
}