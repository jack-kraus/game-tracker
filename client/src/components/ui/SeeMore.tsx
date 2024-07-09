"use client";

import { useLayoutEffect, useRef, useState } from "react";
import ClickAwayListener from "react-click-away-listener";

export default function SeeMore({children, lines}) {
    const ref = useRef<null | HTMLParagraphElement>(null);
    const [showMore, setShowMore] = useState(false);
    const [showLink, setShowLink] = useState(false);

    useLayoutEffect(() => {
        function updateSize() {
            if (!ref.current) return;
            if (ref.current.clientHeight < ref.current.scrollHeight) { setShowLink(true); }
            else { setShowLink(false); }
        }
        updateSize();
        window.addEventListener('resize', updateSize);
    }, [ref]);

    const onClickMore = () => {
        setShowMore(!showMore);
    };

    return <>
        <ClickAwayListener onClickAway={()=>setShowMore(false)}>
        <div className="flex flex-col gap-1">
            <p ref={ref} className={"h-full text-ellipsis overflow-hidden " + (showMore ? "line-clamp-none" : "line-clamp-5")}>
                {children}
            </p>
            {showLink && <button className="text-scale-200 hover:text-scale-0" onClick={onClickMore}>&#x28;See {showMore ? "Less" : "More"}&#x29;</button>}
        </div>
        </ClickAwayListener>
    </>;
}