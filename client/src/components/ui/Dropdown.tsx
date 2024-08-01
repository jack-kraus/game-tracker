"use client"

import { useState } from "react"
import { TbDotsVertical } from "react-icons/tb";
import ClickAwayListener from 'react-click-away-listener';
import { cn } from "@/data/utils";

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
        return cn("whitespace-nowrap w-full bg-scale-0 relative hover:bg-scale-300 flex flex-row text-scale-1000 p-2 items-center",
        {
            "rounded-t-lg": ind === 0,
            "rounded-b-lg": ind === len - 1
        });
    }

    return <ClickAwayListener onClickAway={() => setOpen(false)}><div className="relative">
        <button type="button" onClick={() => setOpen(!open)}><TbDotsVertical/></button>
        {open && <ul className={"flex flex-col self-start absolute" + (!right ? " -right-0.5" : "")}>
            {options.map((item : DropdownOption, ind : number) => <li key={ind}>
                <button 
                    onClick={closeWrap(item.onClick)}
                    type="button"
                    className={roundClass(ind, options.length)}
                >
                    {item.label}
                </button>
            </li>)}
        </ul>}
    </div></ClickAwayListener>;
}