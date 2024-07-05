"use client";

import { createClient } from "@/utils/supabase/client";
import { FormProvider, useForm } from "react-hook-form";
import Input from "./Input";
import hook from "@/data/hook_options";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function CommentForm({ id }) {
    const [loading, setLoading] = useState(false);

    const methods = useForm();
    const { setError, handleSubmit, reset } = methods;
    const queryClient = useQueryClient();

    const supabase = createClient();
    async function addReview(data : any) {
        setLoading(true);
        let {content} = data;
        try {
            const { error } = await supabase
                .from('comment')
                .insert({ post: id, content:content });
            if (error) throw error.message;
        } catch(error) { setError("content", { type: 'server', message: error }); return; } 
        await queryClient.refetchQueries({ queryKey: ["comments"], type: 'active' });
        reset();
        setLoading(false);
    }
    
    return <FormProvider {...methods}>
        <form className="flex w-full" onSubmit={handleSubmit(addReview)}>
            <Input
                id="content"
                placeholder="Share your thoughts on this review..."
                type="textarea"
                hookOptions={hook.required_validation("Content")}
                inputClass="w-full input-box rounded-r-none min-h-12 grow"
                rows={3}
                labelClass="flex w-24 justify-center items-center text-center px-5 bg-scale-800"
            />
            <button type="submit" disabled={loading} className='primary-button rounded-l-none'>Submit{loading && "..."}</button>
        </form>
    </FormProvider>;
}