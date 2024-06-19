import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

interface FollowParams {
    id: string,
    following: boolean
}

export default function FollowButton({id, following} : FollowParams) {
    const [isFollowing, setIsFollowing] = useState(following);
    const [loading, setLoading] = useState(false);

    const supabase = createClient();

    async function deleteFollowing() {
        const { data : { user }} = await supabase.auth.getUser();
        if (!user || !user.id) return { error: "Not signed in" };
        
        return await supabase
            .from('follower')
            .delete()
            .eq('user_id', user.id)
            .eq('following', id);
    }

    async function addFollowing() {
        const { data : { user }} = await supabase.auth.getUser();
        if (!user || !user.id) return { error: "Not signed in" };

        return await supabase
            .from('follower')
            .insert({user_id: user.id, following : id})
    }

    async function handleFollowing() {
        setLoading(true);
        
        let response;
        if (isFollowing) response = await deleteFollowing();
        else response = await addFollowing();

        const { error } = response;
        if (!error) setIsFollowing(!isFollowing);
        else { alert(error); }

        setLoading(false);
    }

    return <button type="button" className="primary-button" onClick={handleFollowing}>
        {loading ? "Loading... " : ""}
        {isFollowing ? "Unfollow" : "Follow"}
    </button>;
}