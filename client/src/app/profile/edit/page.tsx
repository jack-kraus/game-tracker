import { getUserServer } from "@/data/users";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import UsernameForm from "@/components/form/EditProfileForms";

export const metadata: Metadata = {
    title: "Edit Profile | Leveler",
    description: "Edit your user information"
};

export default async function EditProfile() {
    'use server';

    const data = await getUserServer();
    if (!data) {
        redirect("/login");
    }

    return <>
        <UsernameForm username={data?.username}/>
    </>;
}