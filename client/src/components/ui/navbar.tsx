"use client";

import { useSearchParams } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { TbUser } from "react-icons/tb";

export default function Navbar() {
    const searchParams = useSearchParams();
    let query = searchParams.get("query") || "";
    let type = searchParams.get("type");
    type = type && ["game", "user"].includes(type.trim()) ? type.trim() : undefined;

    return (
        <nav className="w-screen h-16 m-0 flex bg-scale-1000 text-scale-0 items-center p-12 justify-between gap-5 fixed top-0 z-10 drop-shadow-md">
            <a href="/"><img className="purple" src="/images/logo.svg"/></a>
            <form className="w-100 flex grow mx-5" action="/search">
                <input id="query" name="query" type="text" className="input-box grow rounded-r-none" required={true} defaultValue={query}/>
                <select name="type" className="bg-scale-800 text-scale-0 px-5" defaultValue={type}>
                    <option value="game">Game</option>
                    <option value="user">User</option>
                </select>
                <button type="submit" className="primary-button rounded-l-none font-bold">Search</button>
            </form>
            <a className="sidebar-icon rounded-sm" href="/post"><FaPlus size={25}/></a>
            <a href="/profile" className="hover:border-white border-opacity-25 hover:border-4 transition-all w-10 h-10 bg-scale-500 hover:bg-scale-300 active:bg-white rounded-full flex justify-center items-center"><TbUser size={30} color="white"/></a>
        </nav>
    );
}