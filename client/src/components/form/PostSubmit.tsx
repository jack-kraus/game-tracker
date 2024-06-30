'use client';

import Input from "@/components/form/Input";
import PurpleGradient from "@/components/other/PurpleGradient";
import { FormProvider, useForm } from "react-hook-form";
import { BsStarFill } from "react-icons/bs";
import hook from "@/data/hook_options";
import { useRouter } from 'next/navigation';

export default function PostSubmit({game_id} : {game_id : number}) {
    const methods = useForm();
    const { watch, setError, handleSubmit } = methods;
    const router = useRouter();

    async function postForm(form_data : any) {
        if (!game_id) { return setError("rating", { message: "Game must be supplied" }); }
        let response : any = {};
        try {
            const url = `/api/game/${game_id}/reviews`;
            console.log(url);
            const data = await fetch(url, {
                method: "POST",
                body: JSON.stringify({...form_data, game: game_id}),
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

    return <FormProvider {...methods}>
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
    </FormProvider>;
}