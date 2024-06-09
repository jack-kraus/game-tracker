'use client';
import { login, signup } from "./actions";

export default function Login() {
    return <form className='flex flex-col gap-5 w-40'>
        <label htmlFor='username'>Username</label>
        <input id="username" name="username" type="email" className='text-black'/>
        <label htmlFor='email'>Email</label>
        <input id="email" name="email" type="email" className='text-black'/>
        <label  htmlFor='password'>Password</label>
        <input id="password" name="password" type="password" className='text-black'/>
        <button formAction={login} className='bg-primary'>Login</button>
        <button formAction={signup} className='bg-primary'>Sign-Up</button>
    </form>;
}