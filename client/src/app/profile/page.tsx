import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { logout } from "../../data/actions";

export default async function Profile() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect('/login');
    }

    return <>
        <h1 className="text-scale-0 underline">Hello {data.user.email}</h1>
        <form>
            <button formAction={logout} className='bg-primary'>Log-Out</button>
        </form>
    </>;
}