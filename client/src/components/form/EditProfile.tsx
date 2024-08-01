'use client';

import { ReactNode, useState } from "react";
import { ChangePasswordForm, ChangeUsernameForm } from "./LoginForm";
import { RiSettings2Fill } from "react-icons/ri";
import { cn } from "@/data/utils";
import { IoCloseSharp } from "react-icons/io5";

enum editState {
    normal,
    username,
    password
}
export function EditProfilePage({ username }) {
    const [state, setState] = useState(editState.normal);

    function stateDiv(label : string, value : string, eState : editState) {
        return <div className="flex flex-row gap-2">
            <strong>{label}: </strong><p className="grow">{value}</p>
            <button className="hover-button" onClick={() => setState(eState)}><RiSettings2Fill/></button>
        </div>
    }

    function formDiv(element : ReactNode) {
        return <div className="flex flex-col">
            <button className="hover-button self-end" onClick={()=>setState(editState.normal)}><IoCloseSharp/></button>
            {element}
        </div>;
    }

    return <>
        <h1 className="text-scale-100 underline">Edit Profile</h1>
        <div className={cn("w-full box-item flex-col gap-3")}>
            {state === editState.username ?  formDiv(<ChangeUsernameForm defaultUsername={username}/>) : stateDiv("Username", username, editState.username)}
            {state === editState.password ? formDiv(<ChangePasswordForm/>) : stateDiv("Password", "********", editState.password)}
        </div>
    </>;
}