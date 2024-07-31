import InfiniteScroller from "@/components/ui/InfiniteScroller";
import { getUserServer } from "@/data/users";
import LogoutButton from "@/components/ui/LogoutButton";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { FaUser } from "react-icons/fa";
import Modal from "@/components/ui/Modal";
import PageScroller from "@/components/ui/PageScroller";
import FollowerTable from "@/components/ui/FollowerTable";

export const metadata: Metadata = {
    title: "Profile | Leveler",
    description: "Your reviews and data"
};

export default async function Profile() {
    'use server';

    const data = await getUserServer();
    if (!data) {
        redirect("/login");
    }

    return <>
        <div className="box-item flex-col gap-3 items-center max-w-xs">
            <h1 className="text-scale-0 underline">Hello, {data?.username}</h1>
            <FaUser className="border-opacity-25 transition-all bg-scale-500 p-3 rounded-full flex justify-center items-center" size={80} color="white"/>
            <FollowerTable {...data}/>
            <LogoutButton/>
        </div>
        <InfiniteScroller title="Top Posts" type="post_user"
            options={{
                author : data.id,
                unlisted : true
            }}
            optionSelectors={{
                order: ["created_at", "likes", "rating"],
                last: ["all", "day", "week", "month"]
            }}
            reverseSelector={true}
            keyStart="posts"
        />
    </>;
}