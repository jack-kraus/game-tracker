"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext({session: null});

const AuthProvider = ({children} : {children : any}) => {
    const supabase = createClient();
    const [sessionState, setSession] = useState(null);
    
    useEffect(() => {
        const { data: {subscription} } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                setSession(null);
            } else if (session) {
                setSession(session);
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    const exposed = {
        session: sessionState
    }

    return <AuthContext.Provider value={exposed}>
        {children}
    </AuthContext.Provider>
}

export const useUser = () => useContext(AuthContext);
export default AuthProvider;