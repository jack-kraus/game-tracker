"use client";

import { useUser } from "@/context/AuthProvider";
import Session from "@/hooks/Session";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { Grid } from "react-loader-spinner";

interface LikeParams {
    id: number,
    liked: boolean,
    likes: number
}

export default function LikeButton({id, liked, likes} : LikeParams) {
    const [isLiked, setIsLiked] = useState(liked);
    const [loading, setLoading] = useState(false);

    let { signedIn, loading:sessionLoading } = useUser();
    const supabase = createClient();

    async function deleteLiked() {
        const { data : { user }} = await supabase.auth.getUser();
        if (!user || !user.id) throw "Not signed in";
        
        const {error} = await supabase
            .from('like')
            .delete()
            .eq('user_id', user.id)
            .eq('post_id', id);
        if (error) throw error.message;
    }

    async function addLiked() {
        const { data : { user }} = await supabase.auth.getUser();
        if (!user || !user.id) throw "Not signed in";

        const {error} =  await supabase
            .from('like')
            .insert({user_id: user.id, post_id : id});
        if (error) throw error.message;
    }

    async function handleLiked() {
        setLoading(true);
        
        try {
            if (isLiked) await deleteLiked();
            else await addLiked();
        } catch (e) {
            alert(e);
            setLoading(false);
            return;
        }

        setIsLiked(!isLiked);
        setLoading(false);
    }

    return <div className="flex flex-row grow-0 justify-around align-middle items-center w-10 h-8">
        <Grid
            width="16"
            height="16"
            color="white"
            visible={loading}
        />
        <button type="button" className="h-4" onClick={handleLiked} hidden={loading} disabled={loading || sessionLoading || !signedIn}>
            <BsHeartFill className={isLiked ? "text-primary" : "text-scale-1000"}/>
        </button>
        <p>{likes - (liked ? 1 : 0) + (isLiked ? 1 : 0)}</p>
    </div>;
}