

export type runnerArgs = {
    canvas: HTMLCanvasElement,
    is_phone: boolean,
    darkmode: boolean,
    safeAddEventListener: (t:string, cb:EventListener, opt?:AddEventListenerOptions)=>void,
    getwinsize () : [number, number],
    isVisible: () => boolean,
    transition: () => number,
};

export type Runner = (args: runnerArgs) => ()=>void;