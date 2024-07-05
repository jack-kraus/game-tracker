import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export default function Session() {
    const [session, setSession] = useState(null);
    
    const supabase = createClient();
    supabase.auth.getSession().then(({data}) => {console.log(data); setSession(data?.session)});

    return { session: session, signedIn : !!session?.user };
}