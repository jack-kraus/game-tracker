'use client';

import useWindowDimensions from "@/hooks/WindowDimensions";
import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { RiCloseFill } from "react-icons/ri";

interface ModalStyle {
    open_element :  ReactNode[] | ReactNode,
    button_styling? : string,
    children : ReactNode[] | ReactNode
}

export default function Modal({open_element, button_styling, children} : ModalStyle) {
    const { document } = useWindowDimensions();
    const [open, setOpen] = useState(false);
    
    const element = <div className="w-screen h-dvh fixed top-0 left-0 bg-opacity-50 bg-black z-10">
        <div className="w-full h-full flex justify-center items-center py-5">
            <div className="box-item flex-col mx-5 bg-scale-900 items-center max-h-full max-w-4xl">
                <button className="self-end text-scale-300 hover:text-scale-0" onClick={()=>setOpen(false)}><RiCloseFill size={25}/></button>
                <div className="flex flex-col w-full h-full overflow-y-scroll items-center gap-3">
                    {children}
                </div>
            </div>
        </div>
    </div>

    return <>
        <button className={button_styling ?? ""} onClick={()=>setOpen(true)}>{open_element}</button>
        {document && open && createPortal(element, document.body)}
    </>;
}