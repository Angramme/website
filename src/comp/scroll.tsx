'use client';

import { useEffect, useRef } from "react";

export default function Scroll() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        const handle = () => {
            const x = 2* window.scrollY / window.innerHeight;
            const opacity = 100 * (1 - x);
            if (ref.current) 
                ref.current.style.opacity = `${opacity}%`;
        };
        addEventListener("scroll", handle);
        return () => removeEventListener("scroll", handle);
    }, [ref]);
    return <div ref={ref} className="w-screen h-screen text-center hidden items-end justify-center pb-4 text-lg sm:flex">
        scroll down
    </div>;
}