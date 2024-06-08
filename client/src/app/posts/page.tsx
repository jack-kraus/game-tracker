import Post from '@/components/Post';
import { createClient } from '@/utils/supabase/server';

export default async function Posts() {
    const supabase = createClient();
    const {data} = await supabase.from("post").select("*");

    return  <main className="flex flex-col w-1/2 items-center mt-4 gap-3 pt-24 pb-4 mx-auto">
        <h1 className="text-scale-0 underline">Feed</h1>
        {data ? data.map((item, index:number) => <Post key={index} {...{...item, author:"Steve"}}/>) : <p>Pending...</p>}
    </main>;
}