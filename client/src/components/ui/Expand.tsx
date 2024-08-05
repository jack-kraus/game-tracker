import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";

export default function Expand({ children, open_element, open_style }) {
    const [open, setOpen] = useState(false);

    return open ? <div>
        <button className="hover-button" onClick={()=> setOpen(false)}><RiCloseFill size={25}/></button>
        {children}
    </div> : <button className={open_style} onClick={() => setOpen(true)}>{open_element}</button>;
}