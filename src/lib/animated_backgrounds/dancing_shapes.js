

class Dancer{
    constructor(draw, transition){
        this.seed = Math.random();
        this.scale = (Math.random()+1);
        this._draw = draw;
        this._transition = transition;
    }
    draw(can, ctx, t){
        t *= .0001;
        const x = can.width* (.5+.35*Math.sin(t*1.7 + Math.sin(t*this.seed)+this.seed*23.));
        const y = can.height* (.5+.25*Math.sin(t*3.3 + Math.sin(t*this.seed*.8)+this.seed*13.));
        const scsc = Math.max(0, 1-this._transition());
        this._draw(ctx, 
            x, y + this.seed*(1-scsc)*200,
            scsc*this.scale*can.width/1080, 
            (t%(2*Math.PI))*40*(.5-this.seed) + this.seed*.8);
    }
}

function circle(color){
    return (ctx, x, y, scale)=>{
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, scale*20, 0, 2 * Math.PI);
        ctx.stroke();
    };
}
function rectangle(color){
    return (ctx, x, y, scale, rot)=>{
        ctx.save();
        ctx.strokeStyle = color;
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.beginPath();            
        ctx.rect(-10*scale, -10*scale, 20*scale, 20*scale);
        ctx.stroke();
        ctx.restore();
    };
}


function anyof(arr){
    return arr[Math.random()*arr.length|0];
}
function randcolor(darmode){
    // return anyof(darmode ?  
    // [
    //     "red", "rgb(50, 50, 255)", "yellow"
    // ] :
    // [
    //     "red", "blue", "yellow"
    // ]
    // );
    return darmode ? "white" : "black";
}

export default function dancing_shapes({canvas, safeAddEventListener, darkmode, getwinsize, isVisible, transition}){
    const render_scale = .8;
    const can = canvas;
    const ctx = can.getContext("2d");
    const can2 = document.createElement("canvas");
    const ctx2 = can2.getContext("2d");

    const onresize = ()=>{
        const [wid, hei] = getwinsize ? getwinsize() : 
            [window.innerWidth*render_scale, window.innerHeight*render_scale];
        can.width = wid;
        can.height = hei;
        can2.width = wid;
        can2.height = hei;
    };
    safeAddEventListener("resize", onresize);
    onresize();

    let dancers = [];
    // let N = Math.min(can.width*can.height*(darkmode ? .00001 : .000015)/render_scale |0, 20);
    let N = 18;
    for(let i=0; i<N; i++){
        dancers.push(new Dancer(anyof([
            circle(randcolor(darkmode)),
            rectangle(randcolor(darkmode))
        ]), transition));
    }

    let ENDLOOP = false;
    let trace_cnt = 0;
    const draw = ()=>{
        if(!ENDLOOP && !isVisible())
            return requestAnimationFrame(draw);

        // ctx.lineWidth = darkmode ? 4.6 : 4.4;
        ctx.lineWidth = darkmode ? 3.6 : 3.;
        if(trace_cnt > 3){
            ctx2.clearRect(0,0, can.width, can.height);
            ctx2.globalAlpha = .9 - Math.min(0.8, transition());
            ctx2.drawImage(can,0,0);
            ctx.clearRect(0,0, can.width, can.height);
            ctx.drawImage(can2,0,0);
            trace_cnt = 0;
        } else{
            ctx.clearRect(0, 0, can.width, can.height);
            ctx.drawImage(can2,0,0);
        }
        trace_cnt++;

        let time = Date.now();

        for(let d of dancers){
            d.draw(can, ctx, time);
        }

        if(!ENDLOOP)
            requestAnimationFrame(draw);
    };
    draw();

    return function cleanup(){
        ENDLOOP = true;
    };
}