'use client';

import { useState } from "react";
import { LoginForm, SignupForm } from "@/components/form/LoginForm";
import { cn } from "@/data/utils";

enum FormState {
    Login,
    SignUp
}

export default function Login() {
    const [state, setState] = useState(FormState.Login);
    
    const form_content = state === FormState.Login ? <LoginForm/> : <SignupForm/>;
    return <>
        <div className="w-full max-w-md">
            <div className="pl-3">
                <button className={cn(`primary-button rounded-b-none`, { "bg-scale-1000 text-primary": state !== FormState.Login })} onClick={() => setState(FormState.Login)}>Login</button>
                <button className={cn(`primary-button rounded-b-none`, { "bg-scale-1000 text-primary": state !== FormState.SignUp })} onClick={() => setState(FormState.SignUp)}>Sign-Up</button>
            </div>
            {form_content}
        </div>
    </>;
}