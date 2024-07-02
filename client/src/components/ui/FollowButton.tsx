"use client";

import { useUser } from "@/context/AuthProvider";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

interface FollowParams {
    id: string,
    following: boolean
}

export default function FollowButton({id, following} : FollowParams) {
    const [isFollowing, setIsFollowing] = useState(following);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const {session} = useUser();

    const supabase = createClient();

    async function deleteFollowing() {
        const { data : { user }} = await supabase.auth.getUser();
        if (!user || !user.id) return { error: "Not signed in" };
        
        try {
            const {error} = await supabase
            .from('follower')
            .delete()
            .eq('user_id', user.id)
            .eq('following', id);
            if (error) throw error;
        } catch(error) {
            return {error : error.message};
        }
    }

    async function addFollowing() {
        const { data : { user }} = await supabase.auth.getUser();
        if (!user || !user.id) return { error: "Not signed in" };

        try {
            const {error} = await supabase
                .from('follower')
                .insert({user_id: user.id, following : id});
            if (error) throw error;
        } catch(error) {
            return {error : error.message};
        }
    }

    async function handleFollowing() {
        setLoading(true);
        setError("");
        
        let response : any;
        if (isFollowing) response = await deleteFollowing();
        else response = await addFollowing();

        const { error } = response;
        if (!error) setIsFollowing(!isFollowing);
        else { setError(error); }

        setLoading(false);
    }

    if (!session || session?.user?.id === id) return <></>;
    return <>
        <button type="button" className="primary-button" onClick={handleFollowing}>
            {loading ? "Loading... " : ""}
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
    </>;
}