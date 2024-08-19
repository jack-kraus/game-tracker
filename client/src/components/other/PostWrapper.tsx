'use client';
import GameSearch from "@/components/form/GameSearch";
import { useState } from "react";
import PostSubmit from "@/components/form/PostSubmit";

export default function PostWrapper({defaultValue} : any) {
    const [value, setValue] = useState(defaultValue ? defaultValue : null);

    return <div className="flex flex-col gap-5 my-5 w-full">
        <GameSearch val={[value, setValue]}/>
        <PostSubmit game_id={value && value.id ? value.id : undefined}/>
    </div>;
}