'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsGearFill } from "react-icons/bs";

enum  usernameState {
    DISPLAY,
    EDIT
}

export default function UsernameForm({username}) {
    const [name, setName] = useState(username);
    const [state, setState] = useState(usernameState.DISPLAY);

    let content;
    if (state === usernameState.DISPLAY) {
        content = <div className="flex flex-row gap-5 items-center">
            <span className="font-bold">Username:</span>
            <p>{name}</p>
            <button onClick={()=>setState(usernameState.EDIT)} className="hover-button px-2"><BsGearFill/></button>
        </div>
    }
    else if (state === usernameState.EDIT) {
        content = <></>;
    }

    return <div className="box-item flex-col">
        {content}
    </div>;
}