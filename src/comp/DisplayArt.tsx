"use client";

import Canvas from "@/comp/canvas";
import dancing_shapes from "../lib/animated_backgrounds/dancing_shapes";
import lines from "../lib/animated_backgrounds/lines";
import lines2 from "../lib/animated_backgrounds/lines2";
import grids from "../lib/animated_backgrounds/grids";
import boids from "../lib/animated_backgrounds/boids";
// import dots from "../lib/animated_backgrounds/dots";
import { useCallback, useEffect, useMemo, useState } from "react";
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

export default function DisplayArt({ className }: { className?: string }) {
    const [artpiece, setArtpiece] = useState(0);
    const [shuffleOn, setShuffleOn] = useState(true);
    const name = useMemo(() => ART[artpiece][1], [artpiece]);
    const func = useMemo(() => ART[artpiece][0], [artpiece]);

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

    return <>
        <Canvas
            script={runArt}
            args={{ func, duration }}
            className={className} />
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
        transition: () => 0,
    });

    return function cleanup() {
        cleanup_fonc();
        cleanupEventListeners();
    };
}