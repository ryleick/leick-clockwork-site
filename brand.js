/* Leick Clockwork — shared brand script */
(function(){
  const INK='#0F1E33', BRASS='#C7972E', BRASSL='#E0BE72', PAPER='#FBF8F1', JEWEL='#8A2F2A';

  function gearPath(cx,cy,rTip,rVal,teeth){
    const step=(Math.PI*2)/teeth; let d="";
    for(let i=0;i<teeth;i++){const b=i*step-Math.PI/2;
      [[b,rVal],[b+step*0.30,rTip],[b+step*0.70,rTip],[b+step,rVal]].forEach((p,idx)=>{
        const x=cx+Math.cos(p[0])*p[1], y=cy+Math.sin(p[0])*p[1];
        d+=(i===0&&idx===0?"M":"L")+x.toFixed(2)+" "+y.toFixed(2)+" ";});}
    return d+"Z";
  }
  function gear(cx,cy,rTip,rVal,teeth,fill,jewel){
    let s='<path d="'+gearPath(cx,cy,rTip,rVal,teeth)+'" fill="'+fill+'"/>';
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(rVal*0.46)+'" fill="'+INK+'"/>';
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(rVal*0.20)+'" fill="'+(jewel||fill)+'"/>';
    return s;
  }
  function ptC(cx,cy,r,deg){const t=deg*Math.PI/180;return [cx+r*Math.sin(t),cy-r*Math.cos(t)];}
  function cArc(cx,cy,r,w,color,op){const [sx,sy]=ptC(cx,cy,r,122),[ex,ey]=ptC(cx,cy,r,58);
    return '<path d="M'+sx.toFixed(1)+' '+sy.toFixed(1)+' A '+r+' '+r+' 0 1 1 '+ex.toFixed(1)+' '+ey.toFixed(1)+'" fill="none" stroke="'+color+'" stroke-width="'+w+'" stroke-linecap="round" opacity="'+(op||1)+'"/>';}
  function tickAt(cx,cy,deg,rOut,rIn,w,color){const [x1,y1]=ptC(cx,cy,rIn,deg),[x2,y2]=ptC(cx,cy,rOut,deg);
    return '<line x1="'+x1.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="'+color+'" stroke-width="'+w+'" stroke-linecap="round"/>';}

  // full CL emblem with gear engine
  function emblem(size, spin){
    let g='';
    g+='<circle cx="110" cy="110" r="100" fill="'+INK+'"/>';
    g+=cArc(110,110,96,1.2,BRASSL,.5);
    g+=cArc(110,110,88,15,BRASS,1);
    g+=cArc(110,110,80,1.2,BRASSL,.45);
    g+=tickAt(110,110,0,74,66,2.4,BRASS)+tickAt(110,110,180,74,66,2.4,BRASS)+tickAt(110,110,270,74,66,2.4,BRASS);
    const engine='<g'+(spin?' class="spin-slow" style="transform-origin:110px 150px"':'')+'>'
      +gear(102,152,28,21,14,BRASS,JEWEL)+gear(70,150,16,11,10,BRASSL,JEWEL)+gear(130,166,13,9,9,BRASSL,JEWEL)+'</g>';
    g+=engine;
    g+='<circle cx="110" cy="110" r="5" fill="'+INK+'" stroke="'+BRASS+'" stroke-width="1.5"/>';
    g+='<line x1="110" y1="110" x2="110" y2="52" stroke="'+PAPER+'" stroke-width="5.5" stroke-linecap="round"/>';
    g+='<line x1="110" y1="110" x2="150" y2="110" stroke="'+PAPER+'" stroke-width="4" stroke-linecap="round"/>';
    g+='<circle cx="110" cy="110" r="3.6" fill="'+BRASSL+'"/>';
    return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">'+g+'</svg>';
  }
  // simplified CL icon
  function icon(size){
    let g='';
    g+='<circle cx="50" cy="50" r="46" fill="'+INK+'"/>';
    g+=cArc(50,50,40,8,BRASS,1);
    g+=tickAt(50,50,0,34,30,2.2,BRASS)+tickAt(50,50,180,34,30,2.2,BRASS)+tickAt(50,50,270,34,30,2.2,BRASS);
    g+='<circle cx="50" cy="50" r="3" fill="'+INK+'" stroke="'+BRASS+'" stroke-width="1"/>';
    g+='<line x1="50" y1="50" x2="50" y2="24" stroke="'+PAPER+'" stroke-width="4" stroke-linecap="round"/>';
    g+='<line x1="50" y1="50" x2="67" y2="50" stroke="'+PAPER+'" stroke-width="3" stroke-linecap="round"/>';
    g+='<circle cx="50" cy="50" r="2.4" fill="'+BRASSL+'"/>';
    return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">'+g+'</svg>';
  }

  const ICONS={
    web:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20M6 6.5h.01M9 6.5h.01"/></svg>',
    gear:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z"/></svg>',
    chat:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>',
    spark:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></svg>',
    phone:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
    mail:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    globe:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z"/></svg>',
    text:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    check:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
  };

  function render(){
    document.querySelectorAll('[data-logo]').forEach(el=>{
      const type=el.getAttribute('data-logo');
      const size=parseInt(el.getAttribute('data-size')||'40',10);
      el.innerHTML = type==='emblem' ? emblem(size, el.hasAttribute('data-spin')) : icon(size);
    });
    document.querySelectorAll('[data-ico]').forEach(el=>{
      el.innerHTML = ICONS[el.getAttribute('data-ico')]||'';
    });
    // footer year
    document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  }

  function mobileNav(){
    const t=document.querySelector('.nav-toggle'), links=document.querySelector('.nav-links');
    if(t&&links){ t.addEventListener('click',()=>links.classList.toggle('open')); }
  }

  function reveal(){
    const els=document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return;}
    const io=new IntersectionObserver((ents)=>{
      ents.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
    },{threshold:.12});
    els.forEach(e=>io.observe(e));
  }

  document.addEventListener('DOMContentLoaded',()=>{render();mobileNav();reveal();});
})();
