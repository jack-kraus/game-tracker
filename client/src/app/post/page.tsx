'use client';
import GameSearch from "@/components/form/GameSearch";
import { useState } from "react";
import PostSubmit from "@/components/form/PostSubmit";

export default function Post({searchParams} : any) {
    const { name, id } = searchParams;
    const [value, setValue] = useState(name && id ? {name, id} : null);

    return <>
        <GameSearch val={[value, setValue]}/>
        <PostSubmit game_id={value && value.id ? value.id : undefined}/>
    </>;
}