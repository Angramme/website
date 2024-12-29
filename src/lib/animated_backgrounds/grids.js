import { createNoise3D } from 'simplex-noise';

const noise_scale = .001;

function pattern(ctx, noise, x, y, s, n, T){
    // const cut1 = -.4;
    // const cut4 = .3;
    // const mid_cut = (cut1+cut4)/2;
    // const mid_cut_dist = .03*Math.abs(cut1-cut4);
    // const cut2 = mid_cut-mid_cut_dist;
    // const cut3 = mid_cut+mid_cut_dist;
    const cut4 = .3;
    const cut3 = -.05;
    const nis = noise(x*noise_scale, y*noise_scale, T);

    if(nis > cut4) return;
    if(n > 0 && nis > cut3){
        const hs = s*.5;
        ctx.strokeRect(x, y, s, s);
        pattern(ctx, noise, x, y, hs, n-1, T+27);
        pattern(ctx, noise, x+hs, y, hs, n-1, T+27);
        pattern(ctx, noise, x, y+hs, hs, n-1, T+27);
        pattern(ctx, noise, x+hs, y+hs, hs, n-1, T+27);
    }
    // else if(n > 0 && nis > cut2){
    //     const am = Math.min(Math.max((nis-cut2)/(cut3-cut2), 0), 1);
    //     const ns = s*(.35+.65*am);
    //     // ctx.strokeRect(x+.5*(s-ns), y+.5*(s-ns), ns, ns);
    //     ctx.globalAlpha = 1-am;
    //     ctx.fillRect(x+.5*(s-ns), y+.5*(s-ns), ns, ns);
    //     ctx.globalAlpha = 1;
    // }
    else{
        const ls = s*.3;
        ctx.fillRect(x+ls, y+ls, s-2*ls, s-2*ls);
    }
}

export default function grids({canvas, is_phone, safeAddEventListener, darkmode, getwinsize, isVisible, transition}){
    const render_scale = .8;
    const can = canvas;
    const ctx = can.getContext("2d");
    const noise3D = createNoise3D();
    
    const onresize = ()=>{
        const [wid, hei] = getwinsize ? getwinsize() : 
            [window.innerWidth*render_scale, window.innerHeight*render_scale];
        can.width = wid;
        can.height = hei;
    };
    safeAddEventListener("resize", onresize);
    onresize();

    const SIZE = 120;
    
    let ENDLOOP = false;
    const draw = ()=>{
        if(!ENDLOOP && !isVisible())
            return requestAnimationFrame(draw);

        ctx.clearRect(0, 0, can.width, can.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = darkmode ? "white" : "black";
        ctx.fillStyle = darkmode ? "white" : "black";

        const T = Date.now()*.00005;

        const padX = (can.width%SIZE)*.5;
        const padY = (can.height%SIZE)*.5;

        for(let x=.5*SIZE+padX; x<can.width-.5*SIZE; x += SIZE){
            for(let y=.5*SIZE+padY; y<can.height-.5*SIZE; y += SIZE*(1+transition())){
                pattern(ctx, noise3D, x-SIZE*.5, y-SIZE*.5, SIZE, 3, T);
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