"use client";

import { useUser } from "@/context/AuthProvider";
import Session from "@/hooks/Session";
import useWindowDimensions from "@/hooks/WindowDimensions";
import { useSearchParams } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { TbSearch, TbUser } from "react-icons/tb";

export default function Navbar() {
    const searchParams = useSearchParams();
    let query = searchParams.get("query") || "";
    let type = searchParams.get("type");
    type = type && ["game", "user"].includes(type.trim()) ? type.trim() : undefined;
    let { width } = useWindowDimensions();
    let { signedIn } = Session();

    return <>
        <nav className="w-screen h-16 m-0 flex bg-scale-1000 text-scale-0 items-center py-12 px-10 justify-between gap-5 fixed top-0 z-10 drop-shadow-md">
            <a href="/" className="shrink-0"><img className="purple" src={width > 650 ? "/images/logo.svg" : "/images/logo_small.svg"}/></a>
            <form className="flex min-w-5 grow" action="/search">
                <input id="query" name="query" type="text" className="input-box rounded-r-none min-w-0" required={true} defaultValue={query} placeholder={`${signedIn}`}/>
                <select name="type" className="bg-scale-800 text-scale-0 px-5 min-w-0" defaultValue={type}>
                    <option value="game">Game</option>
                    <option value="user">User</option>
                </select>
                <button type="submit" className="primary-button rounded-l-none font-bold shrink min-w-0 flex justify-center items-center"><TbSearch className="shrink-0" size={20}/></button>
            </form>
            <a className="sidebar-icon rounded-sm flex-shrink-0" href="/post"><FaPlus size={25}/></a>
            {
                !signedIn
                ? <a href="/login" className="primary-button">Login</a>
                : <a href="/profile" className="flex-shrink-0 hover:border-white border-opacity-25 hover:border-4 transition-all w-10 h-10 bg-scale-500 hover:bg-scale-300 active:bg-white rounded-full flex justify-center items-center"><TbUser size={30} color="white"/></a> 
            }
        </nav>
        <p></p>
    </>;
}