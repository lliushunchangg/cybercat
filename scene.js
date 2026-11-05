(()=>{'use strict';
// High-quality native renders of the licensed 3D rig, selected by live input.
// These are individual transparent poses, not a video playback timeline.
const host=document.getElementById('world'),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),images={};host.prepend(canvas);
let ready=false,enabled=true,mode='sniff',action='idle',actionTime=0,time=0,near=false,view=0,energy=80,down=false,inside=false;
let pointer={x:0,y:0},last={x:0,y:0,t:0},lastMove=-10,lastPlay=-10,petTime=0,tracking=0,previous=0,current='look_1_1',old=current,changed=0;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let cachedW=host.clientWidth,cachedH=host.clientHeight,lastPaint='',lastFrame=0;
function bounds(){const w=cachedW,h=cachedH,size=Math.min(w*(near?.98:.86),h*(near?1:.88));return{w,h,size,x:w*.53-size*.5,y:h*.78-size}}
function pointerAt(e){const r=canvas.getBoundingClientRect();pointer={x:e.clientX-r.left,y:e.clientY-r.top};inside=true}
function nearCat(){const b=bounds();return pointer.x>b.x+b.size*.18&&pointer.x<b.x+b.size*.83&&pointer.y>b.y+b.size*.12&&pointer.y<b.y+b.size*.94}
function choosePose(name){if(!images[name]||name===current)return;old=current;current=name;changed=time}
function drawToy(x,y){
 ctx.save();ctx.strokeStyle='#e5d7c5';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x+45,y-220);ctx.bezierCurveTo(x+35,y-110,x-12,y-50,x,y);ctx.stroke();ctx.translate(x,y);ctx.rotate(Math.sin(time*6)*.12);
 for(let i=0;i<3;i++){ctx.save();ctx.rotate((i-1)*.62);ctx.fillStyle=['#c69092','#e6d4b4','#b0b99e'][i];ctx.beginPath();ctx.moveTo(0,-7);ctx.bezierCurveTo(-14,8,-12,37,0,47);ctx.bezierCurveTo(12,37,14,8,0,-7);ctx.fill();ctx.strokeStyle='#7b6554';ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(0,-7);ctx.lineTo(0,42);ctx.stroke();for(let n=4;n<40;n+=6){ctx.beginPath();ctx.moveTo(0,n+4);ctx.lineTo(7,n-2);ctx.moveTo(0,n+4);ctx.lineTo(-7,n-2);ctx.stroke()}ctx.restore()}
 ctx.fillStyle='#a58a73';ctx.beginPath();ctx.arc(0,0,3,0,Math.PI*2);ctx.fill();ctx.restore();
}
function frame(now){
 requestAnimationFrame(frame);if(!ready||!enabled||document.hidden){previous=now;return}if(now-lastFrame<1000/30&&!(mode==='play'&&inside))return;lastFrame=now;const dt=Math.min((now-(previous||now))/1000,.1);previous=now;time+=dt;
 const b=bounds(),age=time-actionTime,active=age<2.4?action:'idle';let pose='look_1_1';
 if(view)pose=view<0?'view_left':'view_right';
 else if(inside){const nx=(pointer.x-(b.x+b.size*.43))/(b.size*.4),ny=(pointer.y-(b.y+b.size*.39))/(b.size*.4);pose='look_'+(nx<-.28?0:nx>.28?2:1)+'_'+(ny<-.25?0:ny>.25?2:1)}
 if(active==='rub')pose='rub_'+Math.min(3,Math.floor((age%1.2)/.3));
 else if(active==='play')pose='paw_'+Math.min(3,Math.floor(age/.35));
 else if(active==='eat')pose='eat';
 else if(active==='rest')pose='rest';
 else if(active==='hiss'||active==='retreat')pose='view_left';
 else if(time%6.7<.38)pose='blink_'+Math.min(2,Math.floor((time%6.7)/.127));
 if(mode==='play'&&inside&&view===0){
  const faceX=b.x+b.size*.43,faceY=b.y+b.size*.43;
  const reachable=Math.hypot((pointer.x-faceX)/(b.size*.40),(pointer.y-faceY)/(b.size*.39))<1;
  if(reachable&&time-lastMove<1.5&&time-lastPlay>5){tracking+=dt;if(tracking>1.15){lastPlay=time;tracking=0;window.onCatGesture?.('play')}}else tracking=Math.max(0,tracking-dt);
 }
 choosePose(pose);
 const breathe=1,lean=active==='rub'?Math.sin(age*Math.PI/2.4)*b.size*.016:0,retreat=active==='retreat'||active==='hiss'?Math.sin(age*Math.PI/2.4)*b.size*.025:0;
 const mix=reduced?1:Math.min(1,(time-changed)/.10),x=b.x+lean-retreat,y=b.y;
 const paintKey=[current,old,Math.round(mix*10),Math.round(x*2),y,b.size,mode==='play'&&inside?time:0].join('|');
 if(paintKey===lastPaint)return;lastPaint=paintKey;ctx.clearRect(0,0,b.w,b.h);
 const footY=b.y+b.size*.91;ctx.save();ctx.translate(b.x+b.size*.48,footY);ctx.scale(1,.19);const g=ctx.createRadialGradient(0,0,0,0,0,b.size*.30);g.addColorStop(0,'#08060655');g.addColorStop(1,'#08060600');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,b.size*.30,0,Math.PI*2);ctx.fill();ctx.restore();
 const padScale=85/70,padExtra=(padScale-1)*b.size/2;ctx.drawImage(images.cushion,b.x-padExtra,b.y-padExtra,b.size*padScale,b.size*padScale);
 if(mix<1){ctx.globalAlpha=1;ctx.drawImage(images[old],x,y,b.size,b.size*breathe)}ctx.globalAlpha=mix;ctx.drawImage(images[current],x,y,b.size,b.size*breathe);ctx.globalAlpha=1;
 if(mode==='play'&&inside)drawToy(pointer.x,pointer.y);
}
new ResizeObserver(()=>{cachedW=host.clientWidth;cachedH=host.clientHeight;lastPaint='';const b=bounds(),ratio=Math.min(devicePixelRatio,1.25);canvas.width=Math.round(b.w*ratio);canvas.height=Math.round(b.h*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='medium'}).observe(host);
canvas.addEventListener('pointerdown',e=>{if(!ready||!enabled||e.button!==0)return;pointerAt(e);host.focus({preventScroll:true});if(mode==='pet'&&!nearCat())return;down=true;last={x:e.clientX,y:e.clientY,t:performance.now()};canvas.setPointerCapture(e.pointerId);if(mode==='sniff')window.onCatGesture?.('sniff');if(mode==='pet'){action='rub';actionTime=time}});
canvas.addEventListener('pointermove',e=>{pointerAt(e);if(!ready||!enabled)return;const now=performance.now(),distance=Math.hypot(e.clientX-last.x,e.clientY-last.y),dt=(now-last.t)/1000;last={x:e.clientX,y:e.clientY,t:now};if(distance>2)lastMove=time;
 if(down&&mode==='pet'&&dt>0){const speed=distance/Math.max(300,host.clientWidth)/dt;if(nearCat()&&speed>.02&&speed<1.4){petTime+=Math.min(dt,.12);action='rub';actionTime=time;window.onPetProgress?.(Math.min(1,petTime/2.5));if(petTime>=2.5){petTime=0;window.onCatGesture?.('pet')}}else if(speed>2)window.onPetProgress?.(-1)}
});
const stop=()=>{down=false;petTime=0;if(mode==='pet')window.onPetProgress?.(0)};
for(const event of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(event,stop);
canvas.addEventListener('pointerleave',()=>{inside=false;tracking=0});window.addEventListener('blur',()=>{stop();inside=false});
host.addEventListener('keydown',e=>{if(e.code==='Space'&&!e.repeat&&enabled){e.preventDefault();if(mode==='play'){const b=bounds();pointer={x:b.x+b.size*.5,y:b.y+b.size*.5};inside=true;view=0;lastMove=time}else window.onCatGesture?.('pet')}});
document.getElementById('rotateLeft').onclick=()=>{view=Math.max(-1,view-1)};document.getElementById('rotateRight').onclick=()=>{view=Math.min(1,view+1)};
document.getElementById('zoom').onclick=()=>{near=!near;document.getElementById('zoom').textContent=near?'远一点':'近一点'};
window.CatStage={mode:k=>{mode=k;view=0;stop();tracking=0;inside=false;host.style.cursor=k==='play'?'crosshair':'grab'},react:(k,a)=>{action=k;actionTime=time},needs:e=>energy=e,enable:v=>{enabled=v;inside=false;stop();if(v)loadImages()},ready:()=>ready};
let loadingTask=null;
function loadImages(){if(loadingTask)return loadingTask;loadingTask=(window.CAT_FRAMES?Promise.resolve():new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=window.CAT_ASSET_URL||'assets.js';script.onload=resolve;script.onerror=reject;document.head.append(script)})).then(()=>Promise.all(Object.entries(window.CAT_FRAMES).map(([name,src])=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>{images[name]=im;resolve()};im.onerror=reject;im.src=src})))).then(()=>{ready=true;lastPaint='';document.getElementById('loading').hidden=true;window.dispatchEvent(new Event('cat-ready'))}).catch(()=>{document.getElementById('loading').textContent='猫咪画面暂时没加载出来，请确认网页旁的资源文件也在。'});return loadingTask}
if(!window.MOON_PREVIEW)loadImages();
requestAnimationFrame(frame);
})();


