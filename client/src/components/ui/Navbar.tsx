"use client";

import useWindowDimensions from "@/hooks/WindowDimensions";
import { FaPlus, FaUser, FaUserPlus } from "react-icons/fa";
import { RiSearchFill } from "react-icons/ri";
import SearchBar from "@/components/ui/SearchBar";
import { Suspense, useState } from "react";
import Modal from "./Modal";
import { BsBellFill } from "react-icons/bs";
import PageScroller from "./PageScroller";
import { cn } from "@/data/utils";
import ClickAwayListener from "react-click-away-listener";
import { createClient } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { notificationCount } from "../other/NavbarWrapper";
import { abbreviateNumber } from "js-abbreviation-number";

export default function Navbar({ user_id, notification_count }) {
    let { width, small } = useWindowDimensions();
    const [ searchOpen, setSearchOpen ] = useState(false);
    const [ notifyCount, setNotifyCount ] = useState(notification_count);
    const queryClient = useQueryClient();
    const supabase = createClient();

    supabase
        .channel('supabase_realtime')
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'notification',
                filter: `user_id=eq.${user_id}`
            },
            (payload) => { console.log(payload); setNotifyCount((current) => current + 1) }
        )
        .subscribe();

    const bell = <div className="relative"><BsBellFill size={25}/>
        {!!notifyCount && <p className="absolute bottom-3 text-xs right-3 text-white font-bold z-10 bg-red-500 px-1 rounded-full">
            {abbreviateNumber(notifyCount)}
        </p>}
    </div>;

    return <ClickAwayListener onClickAway={() => setSearchOpen(false)}>
        <nav className={cn("w-full h-16 m-0 flex bg-scale-1000 text-scale-0 items-center justify-between fixed top-0 z-10 drop-shadow-md sm:py-12 sm:px-8 py-11 px-4 sm:gap-5 gap-5", { "gap-3" : searchOpen })}>
            <div className="shrink-0 group w-10 sm:w-32 h-10 sm:grow-0">
                <a href="/" className="h-full flex shrink-0">
                    <img className="shrink-0 object-cover purple group-hover:drop-shadow-white-md group-active:drop-shadow-white-xl group-active:invert group-active:hue-rotate-180" src={small ? "/images/logo_small.svg" : "/images/logo.svg"}/>
                </a>
            </div>
            <Suspense fallback={<div className="grow"></div>}>
                {(!small || searchOpen) ? <SearchBar width={width}/> : <><div className="grow"/><button onClick={()=>setSearchOpen(true)} className="hover:bg-scale-400 active:bg-scale-100 p-2 rounded-full flex justify-end"><RiSearchFill size={25}/></button></>}
            </Suspense>
            {(!small || !searchOpen) && user_id && <Modal onOnClick={() => queryClient.refetchQueries({ queryKey: ["notification"] })} offOnClick={() => notificationCount().then((result) => setNotifyCount(result)) } button_styling="hover:bg-scale-400 active:bg-scale-100 p-2 rounded-full static" open_element={bell}>
                <PageScroller
                    route="/api/notification"
                    title="Notifications"
                    type="notification"
                    keyStart="notification"
                />
            </Modal>}
            <a className="sidebar-icon flex-shrink-0" href="/post"><FaPlus size={25}/></a>
            {
                !user_id ? <a className="sidebar-icon flex-shrink-0" href="/post"><FaUserPlus size={25}/></a>
                : <a href="/profile" className="sidebar-icon text-scale-0 flex-shrink-0 border-opacity-25 hover:border-4 hover:margin-4 bg-scale-500 active:text-white hover:text-scale-500"><FaUser size={25}/></a>
            }
        </nav>
    </ClickAwayListener>;
}
