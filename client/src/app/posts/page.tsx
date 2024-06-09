import Post from '@/components/Post';
import { createClient } from '@/utils/supabase/server';

export default async function Posts() {
    const supabase = createClient();
    const {data} = await supabase.from("post").select("*");

    return  <>
        <h1 className="text-scale-0 underline">Feed</h1>
        {data ? data.map((item, index:number) => <Post key={index} {...{...item, author:"Steve"}}/>) : <p>Pending...</p>}
    </>;
}