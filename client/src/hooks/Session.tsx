import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Session() {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    
    const supabase = createClient();
    const pathname = usePathname();

    useEffect(() => {
        setLoading(true);
        supabase.auth.getSession().then(({data}) => {
            setSession(data && data?.session ? data.session : null);
            setLoading(false);
        });
    }, [pathname]);

    return { session: session, signedIn : !!session?.user, loading };
}