'use client';
import GameSearch from "@/components/GameSearch";
import Input from "@/components/Input";
import PurpleGradient from "@/components/PurpleGradient";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BsStarFill } from "react-icons/bs";
import hook from "@/data/hook_options";
import { useRouter } from 'next/navigation';
import { signup } from "@/data/actions";
import axios from "axios";

export default function Post({searchParams} : any) {
    const methods = useForm();
    const { watch, setError, handleSubmit, register } = methods;

    async function onSubmit(data : any) {
        try { await signup(data); }
        catch(e) { setError("confirm_password", {type:"server", message: `${e}`}); }
    }
    
    const { name, id } = searchParams;
    
    // const [range, setRange] = useState(50);
    const [value, setValue] = useState(name && id ? {name, id} : null);

    const router = useRouter();

    async function postForm(form_data : any) {
        if (!value || !value.id) { return setError("rating", { message: "Game must be supplued" }); }
        let response : any = {};
        try {
            const url = `/api/game/${value.id}/reviews`;
            console.log(url);
            const data = await fetch(url, {
                method: "POST",
                body: JSON.stringify({...form_data, game: value.id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json());
            response = data;
        } catch (e) { return setError("rating", { message: `${e}` }); }

        if (!response.success) {
            setError("content", { type:"server", message:`${response.error}`});
        }
        else {
            router.push("/profile");
        }
    }

    function starClass(i : number) {
        const range = watch("rating");
        if ((i+1)*2 <= range) return <BsStarFill className="text-primary"/>;
        else if (range-1 === i*2) return <BsStarFill style={{ fill: "url(#blue-gradient)" }}/>;
        else return <BsStarFill className="text-scale-100"/>;
    }

    return <>
        <GameSearch val={[value, setValue]}/>
        <FormProvider {...methods}>
            <form className='flex flex-col gap-3 box-item' onSubmit={handleSubmit(postForm)}>
                <Input
                    id="title"
                    label="Title"
                    placeholder="Post Title"
                    type="text"
                    hookOptions={hook.required_validation("Title")}
                />
                <Input
                    id="content"
                    label="Content"
                    placeholder="Share your thoughts..."
                    type="textarea"
                    hookOptions={hook.required_validation("Content")}
                />

                <Input
                    id="rating"
                    label="Rating"
                    placeholder=""
                    type="range"
                    hookOptions={{...hook.range_validation("Content", 0, 10), valueAsNumber:true}}
                    min="0"
                    max="10"
                />

                <PurpleGradient/>            
                <div className="flex flex-row p-0">{[...Array(5)].map((_, ind) => starClass(ind))}</div>
                <button type="submit" className='primary-button'>Submit</button>
            </form>
        </FormProvider>
    </>;
}