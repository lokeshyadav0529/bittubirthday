(() => {
  const layer = document.querySelector('.petals');
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('span'); p.className = 'petal'; p.textContent = ['✿','❀','♥'][i % 3];
    p.style.left = ((i * 37) % 100) + '%'; p.style.animationDelay = (-(i % 9) * 2.1) + 's';
    p.style.animationDuration = (15 + (i % 7) * 2) + 's'; p.style.fontSize = (9 + (i % 5) * 3) + 'px'; layer.append(p);
  }
  window.burstHearts = (x = innerWidth * .5, y = innerHeight * .48) => {
    for (let i = 0; i < 36; i++) { const h = document.createElement('span'); h.textContent = i % 3 ? '✦' : '♥';
      h.style.cssText = `position:fixed;left:${x}px;top:${y}px;z-index:10;color:${i%2?'#e9c77e':'#d64b67'};pointer-events:none;font-size:${8+Math.random()*13}px;transition:transform 1.2s ease-out,opacity 1.2s;`;
      document.body.append(h); requestAnimationFrame(() => { h.style.transform = `translate(${(Math.random()-.5)*480}px,${(Math.random()-.7)*450}px) rotate(${Math.random()*500}deg)`; h.style.opacity = '0'; }); setTimeout(() => h.remove(), 1300);
    }
  };
  window.firecrackers = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:20;pointer-events:none';
    canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio); document.body.append(canvas);
    const colors = ['#ffd45e','#ff6b35','#ff3e64','#fff4d6','#62d9ff','#d981ff'];
    const rockets = [], sparks = [], flashes = []; let launched = 0, frame = 0; const total = 14;
    const launch = () => {
      const x = innerWidth * (.08 + Math.random() * .84), targetY = innerHeight * (.1 + Math.random() * .38);
      rockets.push({x, y:innerHeight+10, targetY, speed:8+Math.random()*3.5, color:colors[(Math.random()*colors.length)|0], trail:[]});
      launched++; if (launched < total) setTimeout(launch, 125 + Math.random()*170);
    };
    const explode = r => {
      flashes.push({x:r.x,y:r.y,r:3,life:16,color:r.color});
      const count = 125 + (Math.random()*45|0), offset = Math.random()*Math.PI*2;
      for (let j=0;j<count;j++) { const angle = Math.PI*2*j/count+offset, speed = 1.4+Math.random()*4.7;
        sparks.push({x:r.x,y:r.y,px:r.x,py:r.y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:65+Math.random()*45,color:Math.random()<.78?r.color:colors[(Math.random()*colors.length)|0],size:.8+Math.random()*1.5,crackle:Math.random()<.13}); }
      setTimeout(() => { for(let j=0;j<28;j++){const a=Math.random()*Math.PI*2,v=1+Math.random()*2.4;sparks.push({x:r.x,y:r.y,px:r.x,py:r.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:24+Math.random()*22,color:'#fff1b0',size:.7+Math.random(),crackle:true});}}, 180);
    };
    const draw = () => {
      frame++; ctx.clearRect(0,0,innerWidth,innerHeight);
      for(let i=rockets.length-1;i>=0;i--){const r=rockets[i];r.trail.push({x:r.x,y:r.y});if(r.trail.length>10)r.trail.shift();r.y-=r.speed;r.x+=Math.sin(frame*.1+i)*.3;
        ctx.lineCap='round';for(let t=1;t<r.trail.length;t++){ctx.globalAlpha=t/r.trail.length*.8;ctx.strokeStyle=r.color;ctx.lineWidth=1+t*.22;ctx.beginPath();ctx.moveTo(r.trail[t-1].x,r.trail[t-1].y);ctx.lineTo(r.trail[t].x,r.trail[t].y);ctx.stroke();}
        ctx.globalAlpha=1;ctx.fillStyle='#fff';ctx.shadowBlur=15;ctx.shadowColor=r.color;ctx.beginPath();ctx.arc(r.x,r.y,2.5,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
        if(r.y<=r.targetY){explode(r);rockets.splice(i,1);}}
      for(let i=flashes.length-1;i>=0;i--){const f=flashes[i];ctx.globalAlpha=f.life/16;ctx.strokeStyle=f.color;ctx.lineWidth=2;ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,Math.PI*2);ctx.stroke();f.r+=3.2;f.life--;if(f.life<=0)flashes.splice(i,1);}
      for(let i=sparks.length-1;i>=0;i--){const p=sparks[i];p.px=p.x;p.py=p.y;p.x+=p.vx;p.y+=p.vy;p.vx*=.986;p.vy=p.vy*.986+.035;p.life--;
        ctx.globalAlpha=Math.min(1,p.life/24)*(p.crackle?.72:1);ctx.strokeStyle=p.color;ctx.lineWidth=p.size;ctx.shadowBlur=p.crackle?3:7;ctx.shadowColor=p.color;ctx.beginPath();ctx.moveTo(p.px,p.py);ctx.lineTo(p.x,p.y);ctx.stroke();if(p.life<=0)sparks.splice(i,1);}
      ctx.globalAlpha=1;ctx.shadowBlur=0;if(launched<total||rockets.length||sparks.length||flashes.length)requestAnimationFrame(draw);else canvas.remove();
    };
    launch(); draw();
  };  window.spawnCrumbs = (x, y) => { for (let i = 0; i < 22; i++) { const c = document.createElement('i');
    c.style.cssText = `position:fixed;z-index:7;left:${x}px;top:${y}px;width:${3+Math.random()*5}px;height:${3+Math.random()*5}px;border-radius:50%;background:${i%2?'#9c2941':'#f0d29b'};pointer-events:none;transition:transform .8s,opacity .8s`;
    document.body.append(c); requestAnimationFrame(() => { c.style.transform = `translate(${(Math.random()-.5)*180}px,${Math.random()*100}px)`; c.style.opacity = '0'; }); setTimeout(() => c.remove(), 850);
  }};
})();







