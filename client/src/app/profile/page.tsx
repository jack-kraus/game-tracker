import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { logout } from "../../data/actions";
import Post from '@/components/Post';

export default async function Profile() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    let posts;

    if (error || !data?.user) {
        redirect('/login');
    }
    else {
        posts = await supabase.from("post").select("*").eq("author", data.user.id);
        posts = posts.data;
    }

    return <>
        <h1 className="text-scale-0 underline">Hello {data.user.email}</h1>
        <form>
            <button formAction={logout} className='primary-button'>Log-Out</button>
            <div className="flex flex-col gap-3">
                {posts ? posts.map((item, index:number) => <Post key={index} {...{...item, author:"Steve"}}/>) : <p>Pending...</p>}
            </div>
        </form>
    </>;
}