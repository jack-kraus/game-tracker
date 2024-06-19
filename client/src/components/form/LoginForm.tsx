"use client"
import { login, signup } from "@/data/actions"
import { useForm, FormProvider } from "react-hook-form";
import hook from "@/data/hook_options";
import Input from "./form/Input";

export function LoginForm() {
    const methods = useForm();
    const { handleSubmit, setError } = methods;

    async function onSubmit(data : any) {
        try { await login(data); }
        catch(e) { setError("password", {type:"server", message: `${e}`}); }
    }

    return <FormProvider {...methods}>
        <form className='flex flex-col gap-3 box-item' noValidate onSubmit={handleSubmit(onSubmit)}>
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
            <button type="submit" className='primary-button'>Login</button>
        </form>
    </FormProvider>
}

export function SignupForm() {
    const methods = useForm();
    const { watch, setError, handleSubmit } = methods;

    async function onSubmit(data : any) {
        try { await signup(data); }
        catch(e) { setError("confirm_password", {type:"server", message: `${e}`}); }
    }

    return <FormProvider {...methods}>
        <form className='flex flex-col gap-3 box-item' noValidate onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Username"
                id="username"
                type="text"
                placeholder="Username"
                hookOptions={hook.required_validation("Username")}
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
            <button type="submit" className='primary-button'>Sign-Up</button>
        </form>
    </FormProvider>
}