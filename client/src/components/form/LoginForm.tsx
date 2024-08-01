"use client"
import { change_password, change_username, login, signup } from "@/data/actions"
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
        const response = await login(data);
        if (response) {
            const { key, message } : any = response;
            setError(key, {type:"server", message: message});
        }
        setLoading(false);
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
        const response = await signup(data);
        if (response) {
            const { key, message } : any = response;
            setError(key, {type:"server", message: message});
        }
        setLoading(false);
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

export function ChangePasswordForm() {
    const methods = useForm();
    const { watch, setError, handleSubmit } = methods;
    const [loading, setLoading] = useState(false);

    async function onSubmit(data : any) {
        setLoading(true);
        const response = await change_password(data);
        if (response) {
            const { key, message } : any = response;
            setError(key, {type:"server", message: message});
        }
        setLoading(false);
    }

    return <FormProvider {...methods}>
        <form className='flex flex-col gap-3 w-full' noValidate onSubmit={handleSubmit(onSubmit)}>
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
                <button type="submit" disabled={loading} className='primary-button grow'>Change Password</button> {loading ? <ThreeDots color="white" width={20} height={20}/> : <></>}
            </div>
        </form>
    </FormProvider>
}

export function ChangeUsernameForm({defaultUsername} : {defaultUsername? : string}) {
    const methods = useForm({ defaultValues: { username: defaultUsername } });
    const { setError, handleSubmit } = methods;
    const [loading, setLoading] = useState(false);

    async function onSubmit(data : any) {
        setLoading(true);
        const response = await change_username(data);
        if (response) {
            const { key, message } : any = response;
            setError(key, {type:"server", message: message});
        }
        setLoading(false);
    }

    return <FormProvider {...methods}>
        <form className='flex flex-col gap-3 w-full' noValidate onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Username"
                id="username"
                type="text"
                placeholder="Username"
                hookOptions={hook.username_validation("Username")}
            />
            <div className="flex w-full items-center gap-3">
                <button type="submit" disabled={loading} className='primary-button grow'>Change Username</button> {loading ? <ThreeDots color="white" width={20} height={20}/> : <></>}
            </div>
        </form>
    </FormProvider>
}