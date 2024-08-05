import { createClient } from "@/utils/supabase/server";
import { createClient as createClientClient } from "@/utils/supabase/client";

export async function getUserIdServer() {
    // get client
    const supabase = createClient();

    // get current user
    const { data: { user } } = await supabase.auth.getUser();
    let user_id = user?.id;

    // get user data
    return user_id ?? undefined;
}

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

export async function isSignedInClient() {
    // get client
    const supabase = createClientClient();
    
    // get user data
    const { data } = await supabase.auth.getSession();

    // get is signed in
    return !!data?.session?.user;
}

export async function isSignedInServer() {
    // get client
    const supabase = createClient();
    
    // get user data
    const { data } = await supabase.auth.getSession();

    // get is signed in
    return !!data?.session?.user;
}