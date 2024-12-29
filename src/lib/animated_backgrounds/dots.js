

export default function dots({canvas, is_phone, safeAddEventListener, darkmode, getwinsize}){
    const can = canvas;
    const bCan = document.createElement("canvas");
    const bC = bCan.getContext('2d');
    const C = can.getContext('2d');

    const redraw_background = ()=>{
        const [Cwid, Chei] = getwinsize ? getwinsize() : 
        [window.innerWidth*render_scale, window.innerHeight*render_scale];

        bCan.width = Cwid;
        bCan.height = Chei;

        bC.clearRect(0, 0, bCan.width, bCan.height);
        let wid = darkmode ? .8 : 1.9;
        let N = bCan.width*bCan.height * .0002 | 0;
        for(let i=0; i<N; i++){
            bC.fillStyle = ["yellow", "red", "blue", "white"][Math.random()*4|0];
            let x = Math.random()*bCan.width|0;
            let y = Math.random()*bCan.height|0;
            bC.fillRect(x, y, wid, 2+Math.random()*1.5);
        }
    };

    let y = 0;
    const redraw = (dt)=>{
        y += 0.02*dt;
        if(y<0) y += can.height;
        y %= can.height;
        C.clearRect(0, 0, bCan.width, bCan.height);
        C.drawImage(bCan, 0, y|0);
        C.drawImage(bCan, 0, (y-can.height)|0);
        if(!dt) dt = 0
    };

    if(!is_phone){
        let lScrollY = window.scrollY;
        safeAddEventListener("scroll", ()=>{
            fps_limit = 60
            let dScrollY = lScrollY - window.scrollY;
            lScrollY = window.scrollY;
            y += dScrollY*0.11;
        })
    }

    const onresize = ()=>{
        can.width = window.innerWidth;
        can.height = window.innerHeight;
        
        redraw_background();
        redraw(0);
    };
    safeAddEventListener("resize", onresize);
    onresize();

    let fps_limit = 20;
    let last = Date.now();
    let ENDLOOP = false;
    const loop = ()=>{
        let nw = Date.now();
        let dt = nw-last;

        if(dt >= 1000/fps_limit){
            redraw(dt);
            last = nw;
            fps_limit = 20;
        }
        if(!ENDLOOP)
            requestAnimationFrame(loop);
    }
    loop();

    return function cleanup(){
        ENDLOOP = true;
    };
}