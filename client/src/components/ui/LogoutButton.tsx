"use client";

import { logout } from "@/data/actions";

export default function LogoutButton() {
    return <button onClick={() => {logout()}} className='primary-button'>Log-Out</button>;
}