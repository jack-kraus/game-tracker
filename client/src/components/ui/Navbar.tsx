"use client";

import Session from "@/hooks/Session";
import useWindowDimensions from "@/hooks/WindowDimensions";
import { useSearchParams } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { TbUser } from "react-icons/tb";
import { ThreeDots } from "react-loader-spinner";
import { RiLoginCircleFill } from "react-icons/ri";
import SearchBar from "@/components/ui/SearchBar";

export default function Navbar() {
    const searchParams = useSearchParams();
    let query = searchParams.get("query") || "";
    let type = searchParams.get("type");
    type = type && ["game", "user"].includes(type.trim()) ? type.trim() : "game";
    let { width } = useWindowDimensions();
    let { signedIn, loading } = Session();

    const cutoff = 640;

    return <>
        <nav className="w-screen h-16 m-0 flex bg-scale-1000 text-scale-0 items-center justify-between fixed top-0 z-10 drop-shadow-md sm:gap-5 gap-3 sm:py-12 sm:px-8 py-11 px-4">
            <div className="shrink-0 group w-10 sm:w-32 h-10">
                <a href="/" className="h-full flex">
                    <img className="object-cover purple group-hover:drop-shadow-white-md group-active:drop-shadow-white-xl group-active:invert group-active:hue-rotate-180" src={width >= cutoff ? "/images/logo.svg" : "/images/logo_small.svg"}/>
                </a>
            </div>
            <SearchBar type={type} query={query} width={width}/>
            <a className="sidebar-icon rounded-sm flex-shrink-0" href="/post"><FaPlus size={25}/></a>
            {
                loading ? <ThreeDots color="#7a7a7a" height={30} width={30}/> :
                (!signedIn ? <a href="/login" className="primary-button sm:px-6 px-3">{width < cutoff ? <RiLoginCircleFill size={30}/> : "Login"}</a>
                : <a href="/profile" className="flex-shrink-0 hover:border-white border-opacity-25 hover:border-4 hover:margin-4 transition-all w-10 h-10 bg-scale-500 hover:bg-scale-300 active:bg-white rounded-full flex justify-center items-center"><TbUser size={30} color="white"/></a>)
            }
        </nav>
    </>;
}
