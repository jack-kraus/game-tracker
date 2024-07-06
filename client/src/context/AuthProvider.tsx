"use client";

import Session from "@/hooks/Session";
import { createContext, useContext } from "react";

const AuthContext = createContext({ session: null, signedIn : false, loading : true });

const AuthProvider = ({children} : {children : any}) => {
    let session = Session();

    return <AuthContext.Provider value={session}>
        {children}
    </AuthContext.Provider>
}

export const useUser = () => useContext(AuthContext);
export default AuthProvider;