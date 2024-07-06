"use client";

import Session from "@/hooks/Session";
import useWindowDimensions from "@/hooks/WindowDimensions";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TbSearch, TbUser } from "react-icons/tb";
import { ThreeDots } from "react-loader-spinner";
import { RiLoginCircleFill } from "react-icons/ri";

export default function Navbar() {
    const searchParams = useSearchParams();
    let query = searchParams.get("query") || "";
    let type = searchParams.get("type");
    type = type && ["game", "user"].includes(type.trim()) ? type.trim() : "game";
    let { width } = useWindowDimensions();
    let { signedIn, loading } = Session();
    const [selection, setSelection] = useState(type);
    const [active, setActive] = useState(false);

    const cutoff = 640;

    return <>
        <nav className="w-screen h-16 m-0 flex bg-scale-1000 text-scale-0 items-center justify-between fixed top-0 z-10 drop-shadow-md sm:gap-5 gap-2 sm:py-12 sm:px-8 py-10 px-6">
            <a href="/" className="shrink-0 group"><img className="purple group-hover:drop-shadow-white-md group-active:drop-shadow-white-xl group-active:invert group-active:hue-rotate-180" src={width > cutoff ? "/images/logo.svg" : "/images/logo_small.svg"}/></a>
            <form className="flex min-w-5 grow" action="/search">
                <input id="query" name="query" type="text" className="input-box rounded-r-none min-w-0" required={true}
                    defaultValue={query} placeholder={width > cutoff ? `Search for a ${selection}...` : "Search..."}
                    onFocus={()=>setActive(true)} onBlur={()=>setActive(false)}
                />
                <select name="type" hidden={active && width < cutoff} className="bg-scale-800 text-scale-0 min-w-0 w-18 px-2 sm:w-24 shrink-0 sm:px-3" defaultValue={type} onChange={(e) => setSelection(e.target.value)}>
                    <option value="game">Game</option>
                    <option value="user">User</option>
                </select>
                <button type="submit" className="primary-button rounded-l-none font-bold shrink min-w-0 flex justify-center items-center"><TbSearch className="shrink-0" size={20}/></button>
            </form>
            <a className="sidebar-icon rounded-sm flex-shrink-0" href="/post"><FaPlus size={25}/></a>
            {
                loading ? <ThreeDots color="#7a7a7a" height={30} width={30}/> :
                (!signedIn ? <a href="/login" className="primary-button sm:px-6 px-3">{width <= cutoff ? <RiLoginCircleFill size={30}/> : "Login"}</a>
                : <a href="/profile" className="flex-shrink-0 hover:border-white border-opacity-25 hover:border-4 transition-all w-10 h-10 bg-scale-500 hover:bg-scale-300 active:bg-white rounded-full flex justify-center items-center"><TbUser size={30} color="white"/></a>)
            }
        </nav>
        <p></p>
    </>;
}