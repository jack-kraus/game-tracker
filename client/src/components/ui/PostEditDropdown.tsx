'use client';

import { useRouter } from "next/navigation";
import Dropdown from "./Dropdown";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useQueryClient } from "@tanstack/react-query";

export default function PostEditDropdown({id}) {    
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    async function deletePost() {
        if (!confirm("Are you sure you want to delete this post?")) { return; }
        setLoading(true);
        fetch(`/api/review/${id}`, {
            method: "DELETE"
        }).then(async (res) => {
            const {success, error} = await res.json();
            if (!success && error) alert(error);
            else await queryClient.refetchQueries({ queryKey: ["posts"], type: 'active' });
            setLoading(false);
        }).catch(() => setLoading(false));
    }
    
    return loading ? <ThreeDots color="white" width="1em" height="1em"/> : <Dropdown options={[
        { label : "Edit Post", onClick : () => { setLoading(true); router.push(`/review/${id}/edit`) } },
        { label : "Delete Post", onClick : () => deletePost() }
    ]}/>
}