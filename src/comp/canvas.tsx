import {useRef, useEffect, RefObject} from "react"

export default function Canvas<T>({script, style={}, args, className='', ref}: {ref?: RefObject<HTMLCanvasElement | null>, script: (canvas: HTMLCanvasElement, args: T) => (() => void), style?: object, args: T, className?: string}){
    const can_ref = ref || useRef<HTMLCanvasElement | null>(null);

    useEffect(()=>{
        const can = can_ref.current;
        if(!can) return console.warn("Canvas ref is null");
        return script(can, args);
    }, [script, args])

    return <canvas ref={can_ref} style={style} className={className}/>
}