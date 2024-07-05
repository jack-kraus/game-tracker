"use client"
import { login, signup } from "@/data/actions"
import { useForm, FormProvider } from "react-hook-form";
import hook from "@/data/hook_options";
import Input from "./Input";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export function LoginForm() {
    const methods = useForm();
    const { handleSubmit, setError } = methods;
    const [loading, setLoading] = useState(false);

    async function onSubmit(data : any) {
        setLoading(true);
        try {
            await login(data);
        }
        catch(e) { 
            setError("password", {type:"server", message: `${e}`});
            setLoading(false);
        }
    }

    return <>
        <FormProvider {...methods}>
            <form className='flex flex-col gap-3 box-item w-full' noValidate onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="name@url.com"
                    hookOptions={hook.email_validation("Email")}
                />
                <Input
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    hookOptions={hook.required_validation("Password")}
                />
                <div className="flex w-full items-center gap-3">
                    <button type="submit" disabled={loading} className='primary-button grow'>{`Login${loading ? "..." : ""}`}</button> {loading ? <ThreeDots color="white" width={20} height={20}/> : <></>}
                </div>
            </form>
        </FormProvider>
    </>
}

export function SignupForm() {
    const methods = useForm();
    const { watch, setError, handleSubmit } = methods;
    const [loading, setLoading] = useState(false);

    async function onSubmit(data : any) {
        setLoading(true);
        try { await signup(data); }
        catch(e) {
            setLoading(false);
            setError("confirm_password", {type:"server", message: `${e.message ? e.message : e}`});
        }
    }

    return <FormProvider {...methods}>
        <form className='flex flex-col gap-3 box-item w-full' noValidate onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Username"
                id="username"
                type="text"
                placeholder="Username"
                hookOptions={hook.username_validation("Username")}
            />
            <Input
                label="Email"
                id="email"
                type="email"
                placeholder="name@url.com"
                hookOptions={hook.email_validation("Email")}
            />
            <Input
                label="Password"
                id="password"
                type="password"
                placeholder="Password"
                hookOptions={hook.password_validation("Password")}
            />
            <Input
                label="Confirm Password"
                id="confirm_password"
                type="password"
                placeholder="Password"
                hookOptions={hook.confirm_password_validation("Confirm Password", watch, "password")}
            />
            <div className="flex w-full items-center gap-3">
                <button type="submit" disabled={loading} className='primary-button grow'>Sign-Up</button> {loading ? <ThreeDots color="white" width={20} height={20}/> : <></>}
            </div>
        </form>
    </FormProvider>
}