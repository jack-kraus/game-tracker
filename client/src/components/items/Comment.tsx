import { useState } from "react";
import Dropdown from "../ui/Dropdown";
import { createClient } from "@/utils/supabase/client";

interface CommentProps {
    author : string,
    content : string,
    id : string
}

export default function Comment({author, content, id} : CommentProps) {
    const [editing, setEditing] = useState<boolean>(false);
    const [text, setText] = useState<string>(content);
    const supabase = createClient();

    async function submitDelete() {
        const { error, data } = await supabase
            .from('comment')
            .delete()
            .eq('id', 1).select();
        if (error || !data.length) alert("Error Deleting");
        else alert("Success");
    }

    async function submitEdit(e : any) {
        e.preventDefault();
        
        const old_content = text;
        const new_content = e.target.content.value;
        
        setText(new_content);
        setEditing(false);

        const { error, data } = await supabase
            .from('comment')
            .update({ content: new_content })
            .eq('id', 1).select();
        if (error) {
            setText(old_content);
            alert(`Error performing update: ${error}`);
        }
        else {
            console.log(data);
        }
    }

    let section = <div className="w-full">
        <cite>{author}</cite>
        <p>{text}</p>
        <p>{id}</p>
    </div>;
    if (editing) {
        section = <form onSubmit={submitEdit} className="flex flex-row w-full">
            <textarea name="content" className="w-full input-box rounded-r-none" defaultValue={text}/>
            <button type="submit" className="h-full rounded-l-none primary-button">Submit</button>
        </form>;
    }

    return <div className="w-full rounded-xl bg-scale-800 text-scale-0 p-3 flex flex-row gap-3 drop-shadow-md">
        {section}
        <Dropdown options={[
            { label : "Edit Comment", onClick : () => setEditing(!editing) },
            { label : "Delete Comment", onClick : submitDelete }
        ]}/>
    </div>;
}