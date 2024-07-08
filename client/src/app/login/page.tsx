'use client';
import { useState } from "react";
import { LoginForm, SignupForm } from "@/components/form/LoginForm";
import { Metadata } from "next";

enum FormState {
    Login,
    SignUp
}

export const metadata: Metadata = {
    title: "Login/Sign-Up | Leveler"
};

export default function Login() {
    const [state, setState] = useState(FormState.Login);
    
    const form_content = state === FormState.Login ? <LoginForm/> : <SignupForm/>;
    return <>
        <div className="w-full max-w-md">
            <div className="pl-3">
                <button className={`primary-button rounded-b-none ${state !== FormState.Login ? "bg-scale-1000 text-primary" : ""}`} onClick={() => setState(FormState.Login)}>Login</button>
                <button className={`primary-button rounded-b-none ${state !== FormState.SignUp ? "bg-scale-1000 text-primary" : ""}`} onClick={() => setState(FormState.SignUp)}>Sign-Up</button>
            </div>
            {form_content}
        </div>
    </>;
}