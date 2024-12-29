import { createNoise3D } from 'simplex-noise';

export default function lines2({canvas, is_phone, safeAddEventListener, darkmode, getwinsize, isVisible, transition}){
    const render_scale = .8;
    const can = canvas;
    const ctx = can.getContext("2d");

    const noise3D = createNoise3D();
    const noise_scale = .001;
    
    const onresize = ()=>{
        const [wid, hei] = getwinsize ? getwinsize() : 
            [window.innerWidth*render_scale, window.innerHeight*render_scale];
        can.width = wid;
        can.height = hei;

        ctx.lineWidth = 6;
    };
    safeAddEventListener("resize", onresize);
    onresize();

    const SIZE = 90;
    
    let ENDLOOP = false;
    const draw = ()=>{
        if(!ENDLOOP && !isVisible())
            return requestAnimationFrame(draw);

        ctx.clearRect(0, 0, can.width, can.height);
        ctx.strokeStyle = darkmode ? "white" : "black";
        const T = Date.now();
        const padX = (can.width%SIZE)*.5;
        const padY = (can.height%SIZE)*.5;

        for(let x=.5*SIZE+padX; x<can.width-.5*SIZE; x += SIZE){
            for(let y=.5*SIZE+padY; y<can.height-.5*SIZE; y += SIZE*(1+transition())){
                ctx.beginPath();
                const A = .5*3.1415*noise3D(x*noise_scale, y*noise_scale, T*.0002);
                const u = .4*SIZE*Math.cos(A);
                const v = .4*SIZE*Math.sin(A);

                ctx.lineWidth = (1-transition())*((6+10)+10*noise3D(7+x*noise_scale*1.3, 4+y*noise_scale*1.7, 10+T*.00017));

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