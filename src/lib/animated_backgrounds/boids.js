import { createNoise3D } from 'simplex-noise';

const noise_scale = .0004;
const wind_force = 0.04;

function nearest_rect(x, y, w, h){
    if(Math.min(x, w-x) < Math.min(y, h-y)){
        return [x < w*.5 ? 0 : w, y];
    }else{
        return [x, y < h*.5 ? 0 : h];
    }
}

function distsq(x, y, u, v){
    return (x-u)*(x-u) + (y-v)*(y-v);
}

const BOID_R = 10;
class Boid{
    constructor(x, y){
        this.x = x;
        this.y = y;
        let a = Math.random()*2*3.14159;
        this.dx = Math.cos(a);
        this.dy = Math.sin(a);
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, BOID_R, 0, 3.14159*2);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x+this.dx*14, this.y+this.dy*14);
        ctx.stroke();
    }
    update(dT, T, w, h, noise, nearest_boid){
        this.x += dT*this.dx;
        this.y += dT*this.dy;

        const a = 2*3.14159*noise(this.x*noise_scale, this.y*noise_scale, T);
        const ndx = Math.cos(a);
        const ndy = Math.sin(a);
        this.dx += ndx*wind_force;
        this.dy += ndy*wind_force;

        const nr_wall = nearest_rect(this.x, this.y, w, h);
        const nr_boid = nearest_boid(this.x, this.y);
        const wall_dist = distsq(this.x, this.y, nr_wall[0], nr_wall[1]);
        const boid_dist = distsq(this.x, this.y, nr_boid[0], nr_boid[1]);
        const avoid = wall_dist < boid_dist ? nr_wall : nr_boid;
        const avoid_dist = Math.sqrt(Math.min(wall_dist, boid_dist));
        const avoid_mag = avoid_dist < 120 ? .03/avoid_dist : 0;

        this.dx += (this.x-avoid[0])*avoid_mag;
        this.dy += (this.y-avoid[1])*avoid_mag;

        const len = Math.sqrt(this.dx*this.dx + this.dy*this.dy);
        this.dx /= len;
        this.dy /= len;

        this.bound(w, h);
        // this.collide(nr_boid);
    }
    bound(w, h){
        this.x = (this.x+w)%w;
        this.y = (this.y+h)%h;
    }
    // collide(other){
    //     const ds = distsq(this.x, this.y, other[0], other[1]);
    //     if(ds < 4*BOID_R*BOID_R){
    //         const d = Math.sqrt(ds);
    //         this.x = this.x +(this.x-other[0])/d*BOID_R*.5;
    //         this.y = this.y +(this.y-other[1])/d*BOID_R*.5;
    //     }
    // }
}

export default function boids({canvas, safeAddEventListener, darkmode, getwinsize, isVisible}){
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

    let bds = Array.from({length: 50}, 
        ()=>new Boid(can.width*Math.random(), can.height*Math.random())
        );
    
    let ENDLOOP = false;
    let pT;
    let T;
    let dT;
    const draw = ()=>{
        if(!ENDLOOP && !isVisible())
            return requestAnimationFrame(draw);
        ctx.clearRect(0, 0, can.width, can.height);
        ctx.lineWidth = 3;
        ctx.fillStyle = darkmode ? "white" : "black";
        ctx.strokeStyle = darkmode ? "white" : "black";

        T = Date.now()*.00001;
        dT = (T-pT)*10000;
        pT = T;

        for(let b of bds){
            b.update(dT || 0, T, 
                can.width, can.height,
                noise3D,
                (x, y)=>{
                    let ret = null;
                    let ret_d = Infinity;
                    for(let ob of bds){
                        if(ob.x == x && ob.y == y) continue;
                        const nd = distsq(ob.x, ob.y, x, y)
                        if(ret_d > nd){
                            ret = ob;
                            ret_d = nd
                        }
                    }
                    return [ret.x, ret.y];
                });
            b.draw(ctx);
        }

        // for(let x=0; x<can.width; x+= 50){
        //     for(let y=0; y<can.height; y+= 50){
        //         ctx.beginPath();
        //         ctx.moveTo(x, y);
        //         const a = 2*3.14159* simp.noise3D(x*noise_scale, y*noise_scale, T);
        //         const ndx = Math.cos(a);
        //         const ndy = Math.sin(a);
        //         ctx.lineTo(x+ndx*8, y+ndy*8);
        //         ctx.stroke();
        //     }
        // }
        
        if(!ENDLOOP)
            requestAnimationFrame(draw);
    };
    draw();

    return function cleanup(){
        ENDLOOP = true;
    };
}