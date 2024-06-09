"use client"
import { login, signup } from "@/data/actions"

export function LoginForm() {
    return <form className='flex flex-col gap-3 box-item'>
        <label htmlFor='email'>Email</label>
        <input id="email" name="email" type="email" className='input-box'/>
        <label  htmlFor='password'>Password</label>
        <input id="password" name="password" type="password" className='input-box'/>
        <button formAction={login} className='primary-button'>Login</button>
    </form>
}

export function SignupForm() {
    return <form className='flex flex-col gap-3 box-item'>
        <label htmlFor='username'>Username</label>
        <input id="username" name="username" className='input-box'/>
        <label htmlFor='email'>Email</label>
        <input id="email" name="email" type="email" className='input-box'/>
        <label  htmlFor='password'>Password</label>
        <input id="password" name="password" type="password" className='input-box'/>
        <button formAction={signup} className='primary-button'>Sign-Up</button>
    </form>
}