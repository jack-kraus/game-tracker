import InfiniteScroller from "@/components/ui/InfiniteScroller";
import { getUserServer } from "@/data/users";
import LogoutButton from "@/components/ui/LogoutButton";
import { TbUser } from "react-icons/tb";
import { redirect } from "next/navigation";
import { Metadata } from "next";

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
            <LogoutButton/>
        </div>
        <InfiniteScroller title="Top Posts" type="post_user"
            options={{
                author : data.id
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