import PostSubmit from "@/components/form/PostSubmit";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import { getJustReviewById } from "@/data/reviews";
import { schema } from "@/data/helpers";

export const metadata: Metadata = {
    title: "Edit Post | Leveler",
    description: "Change up your review and save back to your profile"
};

export default async function EditPost({params} : any) {
    "use server";

    // get starting data
    let { id } = params;
    try { id = await schema.numberIdSchema.validate(id); }
    catch (error) { return <h1 className="text-red-500">Improper ID</h1>; }
    let data : any;
    try { data = await getJustReviewById(id); }
    catch (e) { return <h1 className="text-red-500">Trouble finding post</h1>; }

    // get user
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // check if can access data
    if (!user || !user.id || !data || user.id !== data.author) {
        redirect("/error");
    }

    // return form
    return <>
        <h1 className="text-scale-0">Review for {data.game_title}</h1>
        <PostSubmit game_id={data.game} defaultValues={data} review_id={data.id}/>
    </>;
}