"use client";

import Session from "@/hooks/Session";
import useWindowDimensions from "@/hooks/WindowDimensions";
import { FaPlus, FaUser, FaUserPlus } from "react-icons/fa";
import { TbUser } from "react-icons/tb";
import { ThreeDots } from "react-loader-spinner";
import { RiLoginCircleFill, RiSearchFill } from "react-icons/ri";
import SearchBar from "@/components/ui/SearchBar";
import { Suspense, useState } from "react";
import Modal from "./Modal";
import { BsBellFill, BsSearch } from "react-icons/bs";
import InfiniteScroller from "./InfiniteScroller";
import PageScroller from "./PageScroller";
import { cn } from "@/data/utils";
import ClickAwayListener from "react-click-away-listener";

export default function Navbar() {
    let { width, small } = useWindowDimensions();
    let { signedIn, loading } = Session();
    const [ searchOpen, setSearchOpen ] = useState(false);

    const cutoff = 640;

    return <ClickAwayListener onClickAway={() => setSearchOpen(false)}>
        <nav className={cn("w-screen h-16 m-0 flex bg-scale-1000 text-scale-0 items-center justify-between fixed top-0 z-10 drop-shadow-md sm:py-12 sm:px-8 py-11 px-4 sm:gap-5 gap-5", { "gap-3" : searchOpen })}>
            <div className="shrink-0 group w-10 sm:w-32 h-10 sm:grow-0 grow">
                <a href="/" className="h-full flex">
                    <img className="object-cover purple group-hover:drop-shadow-white-md group-active:drop-shadow-white-xl group-active:invert group-active:hue-rotate-180" src={(searchOpen && small) ? "/images/logo_small.svg" : "/images/logo.svg"}/>
                </a>
            </div>
            <Suspense fallback={<div className="grow"></div>}>
                {(!small || searchOpen) ? <SearchBar width={width}/> : <button onClick={()=>setSearchOpen(true)} className="hover:bg-scale-400 active:bg-scale-100 p-2 rounded-full"><RiSearchFill size={25}/></button>}
            </Suspense>
            {(!small || !searchOpen) && <Modal button_styling="hover:bg-scale-400 active:bg-scale-100 p-2 rounded-full" open_element={<BsBellFill size={25}/>}>
                <PageScroller
                    route="/api/notification"
                    title="Notifications"
                    type="notification"
                    keyStart="notification"
                />
            </Modal>}
            <a className="sidebar-icon flex-shrink-0" href="/post"><FaPlus size={25}/></a>
            {
                loading ? <ThreeDots color="#7a7a7a" height={30} width={30}/> :
                (!signedIn ? <a className="sidebar-icon flex-shrink-0" href="/post"><FaUserPlus size={25}/></a>
                : <a href="/profile" className="sidebar-icon text-scale-0 flex-shrink-0 border-opacity-25 hover:border-4 hover:margin-4 bg-scale-500 active:text-white hover:text-scale-500"><FaUser size={25}/></a>)
            }
        </nav>
    </ClickAwayListener>;
}
