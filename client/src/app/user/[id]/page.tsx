import React, { cache } from "react";
import FollowButton from "@/components/ui/FollowButton";
import InfiniteScroller from '@/components/ui/InfiniteScroller';
import { getUserByIdServer } from "@/data/users";
import { schema } from "@/data/helpers";
import { FaUser } from "react-icons/fa";

const userById = cache(async (id : string | number) => {
    try { id = await schema.uuidSchema.validate(id); }
    catch (error) { throw "Improper Id"; }
    const user = await getUserByIdServer(id);
    if(!user) { throw "User not found"; }
    return { user, id };
});

export async function generateMetadata({ params } : any) {
    let { id } = params;
    let user;
    try { ({ user, id } = await userById(id)); }
    catch (error) { return { title: `Error | Leveler` } }

    return { title: `${user?.username} | User | Leveler` }
}

export default async function Profile({params} : any) {
    let { id } = params;
    let user;
    try { ({ user, id } = await userById(id)); }
    catch (error) { return <h1 className="text-red-500">{error}</h1> }

    return <>
        <div className="box-item flex-col max-w-xs gap-3 items-center">
            <h1 className="text-scale-0 underline">{user?.username}&apos;s Page</h1>
            <FaUser className="border-opacity-25 transition-all bg-scale-500 p-3 rounded-full flex justify-center items-center" size={80} color="white"/>
            <FollowButton id={id} followers={user?.followers} following={user?.following} is_following={user?.is_following}/>
        </div>
        <InfiniteScroller title="Top Posts" type="post_user"
            options={{
                author : id,
            }}
            optionSelectors={{
                order: ["created_at", "likes", "rating"],
                last: ["all", "day", "week", "month"]
            }}
            reverseSelector={true}
        />
    </>;
}