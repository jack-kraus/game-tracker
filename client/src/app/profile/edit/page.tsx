'use server';

import { getUserServer } from "@/data/users";
import { redirect } from "next/navigation";
import { EditProfilePage } from "@/components/form/EditProfile";


export default async function EditProfile() {
    const data = await getUserServer();
    if (!data) {
        redirect("/login");
    }

    return <EditProfilePage {...data}/>
}