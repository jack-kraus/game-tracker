"use client";

import { useUser } from "@/context/AuthProvider";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import FollowerTable from "./FollowerTable";

interface FollowParams {
    id: string,
    username: string,
    followers? : number,
    following? : number,
    is_following: boolean
}

export default function FollowButton({id, username, followers, following, is_following} : FollowParams) {
    const [isFollowing, setIsFollowing] = useState(is_following);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    let {session, loading:sessionLoading} = useUser();

    const supabase = createClient();

    async function deleteFollowing() {
        const { data : { user }} = await supabase.auth.getUser();
        if (!user || !user.id) return "Not signed in";
        
        const {error} = await supabase
            .from('follower')
            .delete()
            .eq('user_id', user.id)
            .eq('following', id);
        if (error) throw error;
    }

    async function addFollowing() {
        const { data : { user }} = await supabase.auth.getUser();
        if (!user || !user.id) return "Not signed in";

        const {error} = await supabase
            .from('follower')
            .insert({user_id: user.id, following : id});
        if (error) throw error.message;
    }

    async function handleFollowing() {
        setLoading(true);
        setError("");

        try {
            if (isFollowing) { await deleteFollowing(); }
            else { await addFollowing(); }
            setIsFollowing(!isFollowing);
        } catch (e) {
            setError(e);
        }

        setLoading(false);
    }

    return <>
        <FollowerTable {...{id, username, is_following, following}} followers={(followers ?? 0) + (isFollowing ? 1 : 0) - (is_following ? 1 : 0)}/>
        {session && session?.user?.id !== id && <div className="flex flex-row gap-2 items-center">
            <button type="button" onClick={handleFollowing} disabled={loading || sessionLoading} hidden={sessionLoading} className='primary-button'>{isFollowing ? "Unfollow" : "Follow"}</button>
            {(loading || sessionLoading) && <ThreeDots color="white" width={20} height={20}/>}
            {error && <p className="text-red-500">{error}</p>}
        </div>}
    </>;
}