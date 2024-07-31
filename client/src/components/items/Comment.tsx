import { useState } from "react";
import Dropdown from "../ui/Dropdown";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/context/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import { RxCross2 } from "react-icons/rx";
import { FaUser } from "react-icons/fa";

interface CommentProps {
    author : string,
    content : string,
    id : string,
    username : string,
    z_index : number
}

enum CommentState {
    normal,
    editing,
    loading
}

export default function Comment({author, content, id, username, z_index} : CommentProps) {
    const [state, setState] = useState(CommentState.normal);
    const [text, setText] = useState<string>(content);
    const supabase = createClient();
    const { session } = useUser();
    const queryClient = useQueryClient();

    async function submitDelete() {
        if (!confirm("Are you sure you want to delete this comment?")) return;
        setState(CommentState.loading);
        const { error, data } = await supabase
            .from('comment')
            .delete()
            .eq('id', id).select();
        if (error || !data.length) {
            alert("Error Deleting");
        } else {
            await queryClient.refetchQueries({ queryKey: ["comments"], type: 'active' });
        }
        setState(CommentState.normal);
    }

    async function submitEdit(e : any) {
        setState(CommentState.loading);
        e.preventDefault();
        
        const old_content = text;
        const new_content = e.target.content.value;

        const { error, data } = await supabase
            .from('comment')
            .update({ content: new_content })
            .eq('id', id).select();
        if (error || !data.length) {
            setText(old_content);
            alert(`Error performing update: ${error}`);
        }
        else {
            setText(new_content);
            setState(CommentState.normal);
        }
    }

    let section = <div className="w-full">
        <a href={`/user/${author}`} className="group w-auto inline-flex gap-1 items-center self-start flex-wrap">
            <FaUser size={20} className="p-1  bg-scale-500 text-scale-0 rounded-full group-hover:rounded-3xl object-contain group-hover:bg-scale-0 group-hover:text-scale-500"/>
            <p className="group-link-item break-words">{username}</p>
        </a>
        <p>{text}</p>
    </div>;
    if (state === CommentState.editing || state === CommentState.loading) {
        section = <form onSubmit={submitEdit} className="flex flex-row w-full">
            <textarea name="content" className="w-full input-box rounded-r-none" disabled={state === CommentState.loading} defaultValue={text}/>
            <button type="submit" className="h-full rounded-l-none primary-button" disabled={state === CommentState.loading}>Submit</button>
        </form>;
    }

    return <div className="w-full rounded-xl bg-scale-800 text-scale-0 p-3 flex flex-row gap-3 drop-shadow-md" style={{zIndex: z_index}}>
        {section}
        {session && session?.user?.id === author && (state === CommentState.normal ? <Dropdown options={[
            { label : "Edit Comment", onClick : () => setState(CommentState.editing) },
            { label : "Delete Comment", onClick : submitDelete }
        ]}/> : <button className="h-full" onClick={() => setState(CommentState.normal)}><RxCross2 size={20}/></button>)}
    </div>;
}