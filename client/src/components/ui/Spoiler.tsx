'use client';
import { cn } from "@/data/utils";
import { ReactNode, useState } from "react"

interface SpoilerProps {
    children : ReactNode | ReactNode[]
}
export default function Spoiler({ children } : SpoilerProps) {
    const [open, setOpen] = useState(false);
    
    return <span className={cn({ "text-black": open })} onClick={() => setOpen(curr => !curr)}>
        {children}
    </span>
}