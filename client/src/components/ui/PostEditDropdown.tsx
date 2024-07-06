'use client';

import { useRouter } from "next/navigation";
import Dropdown from "./Dropdown";

export default function PostEditDropdown({id}) {    
    const router = useRouter();

    async function deletePost() {
        if (!confirm("Are you sure you want to delete this post?")) { return; }
        await fetch(`/api/review/${id}`, {
            method: "DELETE"
        }).then(async (res) => {
            const {success, error} = await res.json();
            if (success) router.refresh();
            else if (error) alert(error);
        });
    }
    
    return <Dropdown options={[
        { label : "Edit Post", onClick : () => router.push(`/review/${id}/edit`) },
        { label : "Delete Post", onClick : () => deletePost() }
    ]}/>
}