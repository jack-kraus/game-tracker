'use client';

import Input from "@/components/form/Input";
import PurpleGradient from "@/components/other/PurpleGradient";
import { FormProvider, useForm } from "react-hook-form";
import { BsStarFill } from "react-icons/bs";
import hook from "@/data/hook_options";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

interface PostSubmit {
    content : string,
    title : string,
    rating : number
}

export default function PostSubmit({game_id, review_id, defaultValues} : {game_id? : number, review_id?: string, defaultValues? : any}) {
    defaultValues = defaultValues ? { rating : 0, ...defaultValues } : { rating : 0 };
    const [loading, setLoading] = useState(false);
    const methods = useForm({ defaultValues });
    const { watch, setError, handleSubmit } = methods;
    const router = useRouter();

    async function postForm(form_data : any) {
        setLoading(true);
        if (!game_id) { 
            setLoading(false);
            setError("rating", { message: "Game must be supplied" });
            return;
        }
        let response : any = {};
        try {
            const url = review_id ? `/api/review/${review_id}` : `/api/game/${game_id}/reviews`;
            console.log(url);
            const data = await fetch(url, {
                method: review_id ? "PATCH" : "POST",
                body: JSON.stringify({...form_data, game: game_id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json());
            response = data;
        } catch (e) { console.log("HELLO"); setLoading(false); return setError("rating", { message: `${e}` }); }

        if (!response.success) {
            console.log("HELLO"); 
            setError("content", { type:"server", message:`${response.error}`});
            setLoading(false);
        }
        else {
            router.push("/profile");
        }
    }

    function starClass(i : number) {
        const range = watch("rating");
        if ((i+1)*2 <= range) return <BsStarFill key={i} className="text-primary"/>;
        else if (range-1 === i*2) return <BsStarFill key={i} style={{ fill: "url(#blue-gradient)" }}/>;
        else return <BsStarFill key={i} className="text-scale-100"/>;
    }

    return <FormProvider {...methods}>
        <form className='flex flex-col gap-3 box-item' onSubmit={handleSubmit(postForm)}>
            <Input
                id="title"
                label="Title"
                placeholder="Post Title"
                type="text"
                hookOptions={hook.string_range_validation("Title", 100)}
            />
            <Input
                id="content"
                label="Content"
                placeholder="Share your thoughts..."
                type="textarea"
                hookOptions={hook.string_range_validation("Content", 10000)}
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
            <div className="flex w-full items-center gap-3">
                <button type="submit" className='primary-button grow' disabled={loading}>{review_id ? "Edit Review" : "Submit"}</button> {loading ? <ThreeDots color="white" width={20} height={20}/> : <></>}
            </div>
        </form>
    </FormProvider>;
}