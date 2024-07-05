"use client";

import { logout } from "@/data/actions";
import LoadingButton from "./LoadingButton";

export default function LogoutButton() {
    return <LoadingButton
        func={logout}
        label="Logout"
    />;
}