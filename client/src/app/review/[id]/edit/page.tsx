"use server";
import PostSubmit from "@/components/form/PostSubmit";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import { getReviewById } from "@/data/reviews";
import { number } from "yup";

const gameId = number().required().min(0);
export const metadata: Metadata = {
    title: "Edit Post | Leveler",
    description: "Change up your review and save back to your profile"
};

export default async function EditPost({params} : any) {
    if (!params.id) { console.log(params); return<></>; }
    const supabase = createClient();
    const { data, error } = await supabase
        .from('post')
        .select('*')
        .eq('id', params.id);
    const {data : {user}} = await supabase.auth.getUser();


    if (!user || !user.id || !data || !data[0] ||user.id !== data[0].author || error) {
        redirect("/error");
    }
    
    const postData = data[0];

    return <>
        <h1 className="text-scale-0">Review for {postData.game_title}</h1>
        <PostSubmit game_id={postData.game} defaultValues={postData} review_id={postData.id}/>
    </>;
}