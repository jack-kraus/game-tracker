'use server';

import { getUserIdServer } from "@/data/users";
import Navbar from "../ui/Navbar";
import { createClient } from "@/utils/supabase/server";

export default async function NavbarWrapper() {
    const user_id = await getUserIdServer();
    const notification_count = await notificationCount();
    return <Navbar user_id={user_id} notification_count={notification_count}/>
}

export async function notificationCount() {
    const supabase = createClient();
    try {
        const { count, error } = await supabase.from("notification_mine").select('*', { count: 'exact', head: true }).eq('read', false);
        if (error) throw error.message;
        return count;
    } catch(e) {
        return 0;
    }
}