"use client";

import { cn } from "@/data/utils";
import { useLayoutEffect, useRef, useState } from "react";

export default function SeeMore({ children }) {
    const ref = useRef<null | HTMLParagraphElement>(null);
    const [showMore, setShowMore] = useState(false);
    const [showLink, setShowLink] = useState(false);

    useLayoutEffect(() => {
        function updateSize() {
            if (!ref.current) return;
            if (ref.current.scrollHeight / 24 > 5) { setShowLink(true); }
            else { setShowLink(false); }
        }
        updateSize();
        window.addEventListener('resize', updateSize);
    }, [ref]);

    const onClickMore = () => {
        setShowMore(!showMore);
    };
    
    return <div className="flex flex-col gap-1">
        <div ref={ref} className={cn("text-ellipsis overflow-hidden whitespace-pre-line", { "line-clamp-none": showMore, "line-clamp-5" : !showMore })}>
            {children}
        </div>
        {showLink && <button className="text-scale-200 hover:text-scale-0" onClick={onClickMore}>&#x28;See {showMore ? "Less" : "More"}&#x29;</button>}
    </div>;
}