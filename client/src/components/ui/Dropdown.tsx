"use client"

import { useState } from "react"
import { TbDotsVertical } from "react-icons/tb";
import ClickAwayListener from 'react-click-away-listener';

interface DropdownOption {
    onClick : () => void,
    label : string
}

export default function Dropdown({ options, right } : { options : DropdownOption[], right? : boolean }) {
    const [open, setOpen] = useState(false);
    
    // take in a function a return a function that calls it and closes the menu
    function closeWrap(a : () => void) : () => void {
        return () => {
            setOpen(false);
            a();
        }
    }

    function roundClass(ind : number, len : number) {
        if (ind === 0 && ind === len - 1) return "rounded-lg";
        else if (ind === 0) return "rounded-t-lg";
        else if (ind === len - 1) return "rounded-b-lg"
    }

    return <ClickAwayListener onClickAway={() => setOpen(false)}><div className="relative">
        <button type="button" onClick={() => setOpen(!open)}><TbDotsVertical/></button>
        {open && <ul className={"flex flex-col self-start absolute" + (!right ? " -right-0.5" : "")}>
            {options.map((item : DropdownOption, ind : number) => <li key={ind}>
                <button 
                    onClick={closeWrap(item.onClick)}
                    type="button"
                    className={"whitespace-nowrap w-full bg-scale-0 relative hover:bg-scale-300 flex flex-row text-scale-1000 p-2 items-center " + roundClass(ind, options.length)}
                >
                    {item.label}
                </button>
            </li>)}
        </ul>}
    </div></ClickAwayListener>;
}