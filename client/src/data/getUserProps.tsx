import { createClient } from "@/utils/supabase/server"

export default async function getUserProps () {
    // Fetch data from external API
    const supabase = createClient();

    // get user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.id) return { props: {} };

    // get username
    const { data, error } = await supabase.from("profile").select("*").eq("id", user.id);
    if (error || !data) return { props: {} };
    const user_info = data[0];
    
    return { props: { user } };
}