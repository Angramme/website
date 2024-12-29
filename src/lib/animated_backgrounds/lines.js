

export default function lines({canvas, safeAddEventListener, darkmode, getwinsize, isVisible, transition}){
    const render_scale = .8;
    const can = canvas;
    const ctx = can.getContext("2d");
    
    const onresize = ()=>{
        const [wid, hei] = getwinsize ? getwinsize() : 
            [window.innerWidth*render_scale, window.innerHeight*render_scale];
        can.width = wid;
        can.height = hei;
    };
    safeAddEventListener("resize", onresize);
    onresize();

    const SIZE = 90;
    
    let ENDLOOP = false;
    const draw = ()=>{
        if(!ENDLOOP && !isVisible())
            return requestAnimationFrame(draw);

        ctx.clearRect(0, 0, can.width, can.height);
        ctx.lineWidth = 9*(1-transition());
        const T = Date.now();
        const X = can.width* (.5+.5*Math.sin(T*.00058));
        const Y = can.height* (.5+.5*Math.cos(T*.00069));
        const padX = (can.width%SIZE)*.5;
        const padY = (can.height%SIZE)*.5;

        ctx.strokeStyle = darkmode ? "white" : "black";

        for(let x=.5*SIZE+padX; x<can.width-.5*SIZE; x += SIZE){
            for(let y=.5*SIZE+padY; y<can.height-.5*SIZE; y += SIZE*(1+transition())){

                ctx.beginPath();
                let u = X-x;
                let v = Y-y;
                const len = Math.sqrt(u*u + v*v);
                const invlen = (SIZE*.4)/len;
                const mix = Math.min(1, len/can.width);
                // ctx.strokeStyle = `rgba(${mix}, 0, ${255-mix})`;
                ctx.lineWidth = SIZE*(mix*.8 + .03);

                const mixlen = mix*.5+.5;
                u *= invlen*mixlen;
                v *= invlen*mixlen;
                ctx.moveTo(x-u, y-v);
                ctx.lineTo(x+u, y+v);
                ctx.stroke();
            }
        }
        
        if(!ENDLOOP)
            requestAnimationFrame(draw);
    };
    draw();

    return function cleanup(){
        ENDLOOP = true;
    };
}