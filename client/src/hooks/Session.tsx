import { createClient } from "@/utils/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Session() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    
    const supabase = createClient();
    const pathname = usePathname();

    useEffect(() => {
        setLoading(true);
        supabase.auth.getSession().then(({data}) => {
            if (data?.session) { setSession(data.session); }
            setLoading(false);
        });
    }, [pathname]);

    return { session: session, signedIn : !!session?.user, loading };
}