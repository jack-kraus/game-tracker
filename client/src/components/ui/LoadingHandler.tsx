import { ReactNode } from "react";
import { Oval } from 'react-loader-spinner';

interface LoadingProps {
    children? : ReactNode,
    data? : any
    isPending : boolean,
    error : any,
    bypass? : boolean
}

export default function LoadingHandler({data, isPending, error, bypass, children} : LoadingProps) {
    if (isPending) return <Oval
        width="80"
        height="80"
        color="white"
        secondaryColor="white"
    />
    else if (error) return <h1 className="text-red-500">{error}</h1>
    else if (!bypass && (data && !data.success)) return <h1 className="text-red-500">{data.error}</h1>
    
    return <>
        {children}
    </>;
}