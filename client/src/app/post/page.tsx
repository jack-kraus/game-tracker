import PostWrapper from "@/components/other/PostWrapper";
import { number } from "yup";
import { searchGameById } from "@/data/games";
import { getUserServer } from "@/data/users";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Post | Leveler",
    description: "Share your gaming thoughts with the world"
};

export default async function Post({searchParams} : any) {
    'use server';
    // redirect if not logged on
    let user = await getUserServer();
    if (!user) redirect("/login");
    
    // validate id and return default if not
    let { id } = searchParams;
    try {
        id = await number().required().positive().validate(id);
        const value = await searchGameById(id);
        return <PostWrapper defaultValue={value}/>;
    }
    catch (e) { return <PostWrapper/>; }
}