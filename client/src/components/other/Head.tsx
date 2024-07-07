'use client';

import useWindowDimensions from "@/hooks/WindowDimensions";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface HeadProps {
    children : ReactNode | ReactNode[],
    debug? : boolean
}

export default function Head({children, debug} : HeadProps) {
    const {document} = useWindowDimensions();
    return document ? createPortal(children, document.head) : (debug && <p>Loading...</p>);
}