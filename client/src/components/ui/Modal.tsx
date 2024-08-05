'use client';

import useWindowDimensions from "@/hooks/WindowDimensions";
import { ReactNode, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { createPortal } from "react-dom";
import { RiCloseFill } from "react-icons/ri";

interface ModalStyle {
    open_element :  ReactNode[] | ReactNode,
    button_styling? : string,
    children : ReactNode[] | ReactNode,
    offOnClick? : () => void,
    onOnClick? : () => void
}

export default function Modal({open_element, button_styling, children, offOnClick, onOnClick} : ModalStyle) {
    const { document } = useWindowDimensions();
    const [open, setOpen] = useState(false);

    const handleOpen = (result : boolean) => {
        if (result && onOnClick) onOnClick();
        if (!result && offOnClick) offOnClick();
        setOpen(result);
    }
    
    const element = <div className="w-screen h-dvh fixed top-0 left-0 bg-opacity-50 bg-black" style={{ zIndex: 99999999 }}>
        <div className="w-full h-full flex justify-center items-center py-5">
            <ClickAwayListener onClickAway={ () => handleOpen(false) }>
                <div className="box-item flex-col mx-5 bg-scale-900 items-center max-h-full max-w-4xl transition-all">
                    <button className="self-end text-scale-300 hover:text-scale-0" onClick={ () => handleOpen(false) }><RiCloseFill size={25}/></button>
                    <div className="flex flex-col w-full h-full overflow-y-scroll items-center gap-3">
                        {children}
                    </div>
                </div>
            </ClickAwayListener>
        </div>
    </div>

    return <>
        <button className={button_styling ?? ""} onClick={ () => handleOpen(true) }>{open_element}</button>
        {document && open && createPortal(element, document.body)}
    </>;
}