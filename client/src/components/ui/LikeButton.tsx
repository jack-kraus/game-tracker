import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { BsHeartFill, BsStarFill } from "react-icons/bs";
import { Grid, RotatingLines } from "react-loader-spinner";

interface LikeParams {
    id: number,
    liked: boolean,
    likes: number
}

export default function LikeButton({id, liked, likes} : LikeParams) {
    const [isLiked, setIsLiked] = useState(liked);
    const [loading, setLoading] = useState(false);

    const supabase = createClient();

    async function deleteLiked() {
        const { data : { user }} = await supabase.auth.getUser();
        if (!user || !user.id) return { error: "Not signed in" };
        
        return await supabase
            .from('like')
            .delete()
            .eq('user_id', user.id)
            .eq('post_id', id);
    }

    async function addLiked() {
        const { data : { user }} = await supabase.auth.getUser();
        if (!user || !user.id) return { error: "Not signed in" };

        return await supabase
            .from('like')
            .insert({user_id: user.id, post_id : id});
    }

    async function handleLiked() {
        setLoading(true);
        
        let response;
        if (isLiked) response = await deleteLiked();
        else response = await addLiked();

        const { error } = response;
        if (!error) setIsLiked(!isLiked);
        else { console.log(error); }

        setLoading(false);
    }

    return <div className="flex flex-row grow-0 justify-around align-middle items-center w-10 h-8">
        <Grid
            width="16"
            height="16"
            color="white"
            visible={loading}
        />
        <button type="button" className="h-4" onClick={handleLiked} hidden={loading}>
            <BsHeartFill className={isLiked ? "text-primary" : "text-scale-1000"}/>
        </button>
        <p>{likes - (liked ? 1 : 0) + (isLiked ? 1 : 0)}</p>
    </div>;
}