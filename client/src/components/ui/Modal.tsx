'use client';

import useWindowDimensions from "@/hooks/WindowDimensions";
import { useState } from "react";
import { createPortal } from "react-dom";
import { RiCloseFill } from "react-icons/ri";

export default function Modal({open_element, children}) {
    const { document } = useWindowDimensions();
    const [open, setOpen] = useState(false);
    
    const element = <div className="w-screen h-screen fixed top-0 left-0 bg-opacity-50 bg-black z-10">
        <div className="w-full h-full flex">
            <div className="box-item m-10 sm:m-24 overflow-y-scroll flex-col">
                <button className="self-end text-scale-300 hover:text-scale-0" onClick={()=>setOpen(false)}><RiCloseFill size={25}/></button>
                {children}
            </div>
        </div>
    </div>

    return <>
        <button onClick={()=>setOpen(true)}>{open_element}</button>
        {document && open && createPortal(element, document.body)}
    </>;
}