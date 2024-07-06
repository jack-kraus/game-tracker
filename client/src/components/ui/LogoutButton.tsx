"use client";

import LoadingButton from "./LoadingButton";
import { logout } from "@/data/actions";

export default function LogoutButton() {
    return <LoadingButton
        func={logout}
        label="Logout"
    />
}