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
        const supabase = createClient();
        
        const { data:user, error:user_error } = await supabase.auth.getUser();
        form_data = {...form_data, game:value?.id, game_cover:value.cover, game_title:value.name, author:user.user.id};
        console.log(form_data);

        const { error } = await supabase.from('post').insert(form_data);

        if (error) {
            router.push("/profile");
            setError("content", { type:"server", message:`${error}`});
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
                <PurpleGradient/>

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
            
                <div className="flex flex-row p-0">{[...Array(5)].map((_, ind) => starClass(ind))}</div>
                <button type="submit" className='primary-button'>Submit</button>
            </form>
        </FormProvider>
    </>;
}