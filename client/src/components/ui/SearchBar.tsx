import React, { useState } from "react";
import { TbSearch } from "react-icons/tb";

export default function SearchBar({query, type, width}) {
    const [active, setActive] = useState(false);
    const [selection, setSelection] = useState(type);
    const cutoff = 640;

    return <form className="flex min-w-5 grow" action="/search">
        <input id="query" name="query" type="text" className="input-box rounded-r-none min-w-0" required={true}
            defaultValue={query} placeholder={width >= cutoff ? `Search for a ${selection}...` : `${selection[0].toUpperCase() + selection.slice(1)}...`}
            onFocus={()=>setActive(true)} onBlur={()=>setActive(false)}
        />
        <div className="bg-scale-800 text-scale-0 min-w-0 w-18 sm:w-24 shrink-0">
            <select name="type" hidden={active && width < cutoff} className="bg-scale-800 text-scale-0 w-full h-full sm:px-3 px-1.5" defaultValue={type} onChange={(e) => setSelection(e.target.value)}>
                <option value="game">Game</option>
                <option value="user">User</option>
            </select>
        </div>
        <button type="submit" className="primary-button rounded-l-none font-bold shrink min-w-0 flex justify-center items-center"><TbSearch className="shrink-0" size={25}/></button>
    </form>
}