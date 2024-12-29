"use client";

import Canvas from "@/comp/canvas";
import dancing_shapes from "../lib/animated_backgrounds/dancing_shapes";
import lines from "../lib/animated_backgrounds/lines";
import lines2 from "../lib/animated_backgrounds/lines2";
import grids from "../lib/animated_backgrounds/grids";
import boids from "../lib/animated_backgrounds/boids";
// import dots from "../lib/animated_backgrounds/dots";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Runner } from "@/lib/animated_backgrounds/interface";
import is_mobile from "@/lib/is_mobile";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';

const ART: [Runner, string][] = [
    [dancing_shapes, "dancing shapes"],
    [lines, "lines"],
    [lines2, "lines 2"],
    [grids, "grids"],
    [boids, "boids"],
    //[dots, "dots"],
]

export default function DisplayArt() {
    const [artpiece, setArtpiece] = useState(0);
    const [shuffleOn, setShuffleOn] = useState(true);
    const name = useMemo(() => ART[artpiece][1], [artpiece]);
    const func = useMemo(() => ART[artpiece][0], [artpiece]);
    const ref = useRef<HTMLCanvasElement>(null);

    const duration = 10000;

    const left = () => {
        setArtpiece(a => (a - 1 + ART.length) % ART.length);
    };
    const right = useCallback(() => {
        setArtpiece(a => (a + 1) % ART.length);
    }, []);

    useEffect(() => {
        if (shuffleOn) {
            const timeout = setInterval(right, duration);
            return () => { clearInterval(timeout) };
        }
    }, [shuffleOn, right]);

    useEffect(()=>{
        const from = 30, to = 0;
        const handle = () => {
            const x = 2* window.scrollY / window.innerHeight;
            const opacity = from * (1 - x) + to * x;
            if (ref.current) 
                ref.current.style.opacity = `${opacity}%`;
        };
        addEventListener("scroll", handle);
        return () => removeEventListener("scroll", handle);
    }, [ref]);

    return <>
        <Canvas
            script={runArt}
            args={{ func, duration }}
            ref={ref}
            className="opacity-30 fixed top-0 left-0 w-screen h-screen z-[-2] invisible sm:visible" />
        <div
            className="fixed bottom-0 right-0 p-10 underline invisible sm:visible text-right"
        >
            <span onClick={() => setShuffleOn(x => !x)}>
                {
                    shuffleOn ? <ReplayIcon /> : <PlayArrowIcon />
                }
            </span>
            <ChevronLeftIcon onClick={left} />
            <ChevronRightIcon onClick={right} />
            <br />
            {name}
        </div>
    </>
}

function runArt(CAN: HTMLCanvasElement, { func }: { func: Runner }) {
    type EventBundle = { t: string, cb: EventListener, opt?: AddEventListenerOptions };
    const eventListenerCleanup: EventBundle[] = [];
    const safeAddEventListener = (t: string, cb: EventListener, opt?: AddEventListenerOptions) => {
        eventListenerCleanup.push({ t, cb, opt });
        window.addEventListener(t, cb, opt);
    };
    const cleanupEventListeners = () => {
        for (const { t, cb, opt } of eventListenerCleanup) {
            window.removeEventListener(t, cb, opt);
        }
    };

    const is_phone = is_mobile();

    // const start = Date.now();
    // const transition_duration = 400;
    // const transition = () => Math.max(Date.now() - start - duration + transition_duration, 0) / transition_duration;

    const cleanup_fonc = is_phone ? () => { } : func({
        canvas: CAN,
        is_phone,
        safeAddEventListener,
        darkmode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
        getwinsize: () => {
            return [
                CAN.width = CAN.offsetWidth | 0,
                CAN.height = CAN.offsetHeight | 0,
            ];
        },
        isVisible: () => window.scrollY / window.innerHeight * 2.0 < 1.,
        transition: () => window.scrollY / window.innerHeight * 2.0,
    });

    return function cleanup() {
        cleanup_fonc();
        cleanupEventListeners();
    };
}