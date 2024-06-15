"use client"

import { useState } from "react"
import { TbDotsVertical } from "react-icons/tb";

interface DropdownOption {
    onClick : () => void,
    label : string 
}

export default function Dropdown({ options } : { options : DropdownOption[] }) {
    const [open, setOpen] = useState(false);
    
    // take in a function a return a function that calls it and closes the menu
    function closeWrap(a : () => void) : () => void {
        return () => {
            setOpen(false);
            a();
        }
    }

    return <div>
        <button type="button" onClick={() => setOpen(!open)}><TbDotsVertical/></button>
        {open ? <ul className="absolute z-10 flex flex-col">
            {options.map((item : DropdownOption, ind : number) => <li key={ind}>
                <button 
                    onClick={closeWrap(item.onClick)}
                    type="button"
                    className={"whitespace-nowrap w-full bg-scale-0 hover:bg-scale-300 flex flex-row text-scale-1000 p-2 items-center " + (ind === 0 ? "rounded-t-lg " : " ") + (ind === options.length-1 ? "rounded-b-lg" : "")}
                >
                    {item.label}
                </button>
            </li>)}
        </ul> : <></>}
    </div>;
}