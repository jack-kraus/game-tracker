'use client';
import GameSearch from "@/components/GameSearch";
import PurpleGradient from "@/components/PurpleGradient";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { BsStarFill } from "react-icons/bs";

export default function Post({searchParams} : any) {
    const { name, id } = searchParams;
    
    const [range, setRange] = useState(50);
    const [value, setValue] = useState(name && id ? {name, id} : null);

    const supabase = createClient();

    async function postForm(e : any) {
        e.preventDefault();
        const { data:user, error:user_error } = await supabase.auth.getUser();
        const form_data = {...Object.fromEntries(new FormData(e.target)), game_cover:value.cover, game_title:value.name, author:user.user.id};
        
        const { error } = await supabase.from('post').insert(form_data);

        if (error) {
            console.log(error);
        }
    }

    function starClass(i : number) {
        if ((i+1)*2 <= range) return <BsStarFill className="text-primary"/>;
        else if (range-1 === i*2) return <BsStarFill style={{ fill: "url(#blue-gradient)" }}/>;
        else return <BsStarFill className="text-scale-100"/>;
    }

    return <>
        <GameSearch val={[value, setValue]}/>
        <form className='flex flex-col gap-3 box-item' onSubmit={postForm}>
            <PurpleGradient/>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" className='input-box'/>
            <label htmlFor="content">Content</label>
            <textarea name="content" id="content" className='input-box'></textarea>
        
            <div className="flex flex-row">{[...Array(5)].map((_, ind) => starClass(ind))}</div>
            <input type="range" min="0" max="10" name="rating" value={range} onChange={(e) => setRange(parseInt(e.target.value))}/>
            
            <input name="game" value={value?.id} hidden/>
            <button type="submit" className='primary-button'>Submit</button>
        </form>
    </>;
}