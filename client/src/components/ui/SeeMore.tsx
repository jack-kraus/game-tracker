"use client";

import { useLayoutEffect, useRef, useState } from "react";

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
        <p ref={ref} className={`h-full text-ellipsis line-clamp-${showMore ? "none" : lines} overflow-hidden`}>
            {children}
        </p>
        {showLink && <button className="text-scale-200 hover:text-scale-0" onClick={onClickMore}>&#x28;See {showMore ? "Less" : "More"}&#x29;</button>}
    </>;
}