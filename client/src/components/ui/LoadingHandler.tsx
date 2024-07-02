import { ReactNode } from "react";
import { Oval } from 'react-loader-spinner';

interface LoadingProps {
    children? : ReactNode,
    data? : any
    isPending : boolean,
    error? : any
}

export default function LoadingHandler({data, isPending, error, children} : LoadingProps) {
    if (isPending) return <Oval
        width="80"
        height="80"
        color="white"
        secondaryColor="white"
    />
    else if (error) return <h1 className="text-red-500">{error}</h1>
    else if (data && !data.success) return <h1 className="text-red-500">{data.error}</h1>
    
    return <>
        {children}
    </>;
}