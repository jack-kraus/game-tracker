"use client";

import { useState } from "react"
import { ThreeDots } from "react-loader-spinner";

interface LoadingButtonProps {
    label : string,
    func : () => Promise<void>,
    buttonClass? : string
}

export default function LoadingButton({ func, label } : LoadingButtonProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function wrapper() {
        setLoading(true);
        try {
            await func();
        } catch(e) {
            setError(e);
            setLoading(false);
        }
    }

    return <div className="flex flex-row gap-2 items-center">
        <button type="button" onClick={wrapper} disabled={loading} className='primary-button'>{label}</button>
        {loading && <ThreeDots color="white" width={20} height={20}/>}
        {error && <p className="text-red-500">{error}</p>}
    </div>;
}