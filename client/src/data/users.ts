import { createClient } from "@/utils/supabase/server";

export async function getUserServer() {
    // get client
    const supabase = createClient();

    // get current user
    const { data: { user } } = await supabase.auth.getUser();
    let user_id = user?.id;

    // get user data
    return user_id ? await getUserByIdServer(user_id) : undefined;
}

export async function getUserByIdServer(user_id : string) {
    // get client
    const supabase = createClient();
    
    // get user data
    const { data, error } = await supabase.from("profile_follow_status").select("*").eq("id", user_id).limit(1);
    if (error || !data || !data[0]) return undefined;

    // return data point
    return data[0];
}