import PostSubmit from "@/components/form/PostSubmit";
import { createClient } from "@/utils/supabase/server";


export default async function EditPost({params} : any) {
    if (!params.id) { console.log(params); return<></>; }
    const supabase = createClient();
    const { data, error } = await supabase
        .from('post')
        .select('*')
        .eq('id', params.id);
    const {data : {user}} = await supabase.auth.getUser();

    if (!user.id || !data || !data[0] ||user.id !== data[0].author || error) {
        console.log(error);
        // redirect("/error");
    }

    const postData = data[0];

    return <>
        <h1 className="text-scale-0">Review for {postData.game_title}</h1>
        <PostSubmit game_id={postData.game} defaultValues={postData} review_id={postData.id}/>
    </>;
}