/* Leick Clockwork — hero portfolio carousel
   Reads window.PORTFOLIO_SITES (see portfolio/portfolio-data.js) and
   builds a rotating showcase of screenshots. Falls back to the emblem
   logo when no sites have been added yet. */
(function(){
  function build(){
    const wrap = document.getElementById('portfolio');
    if(!wrap) return;
    const slidesEl = wrap.querySelector('.portfolio-slides');
    const dotsEl = wrap.querySelector('.portfolio-dots');
    const sites = (window.PORTFOLIO_SITES||[]).filter(s=>s&&s.image);

    if(!sites.length){
      slidesEl.innerHTML = '<div class="portfolio-empty" data-logo="emblem" data-size="150" data-spin></div>';
      if(dotsEl) dotsEl.remove();
      return;
    }

    sites.forEach((s,i)=>{
      const el = document.createElement(s.url ? 'a' : 'div');
      if(s.url){ el.href = s.url; el.target = '_blank'; el.rel = 'noopener'; }
      el.className = 'portfolio-slide' + (i===0 ? ' active' : '');
      const cap = s.name ? '<span class="ps-cap">'+s.name+'</span>' : '';
      el.innerHTML = '<img src="'+s.image+'" alt="'+(s.name||'Website project')+' screenshot" loading="lazy">'+cap;
      slidesEl.appendChild(el);

      const dot = document.createElement('button');
      if(i===0) dot.className = 'active';
      dot.type = 'button';
      dot.setAttribute('aria-label','Show '+(s.name||('project '+(i+1))));
      dot.addEventListener('click', ()=>go(i));
      dotsEl.appendChild(dot);
    });

    const slides = [...slidesEl.querySelectorAll('.portfolio-slide')];
    const dots = [...dotsEl.querySelectorAll('button')];
    let idx = 0, timer;

    function go(n){
      slides[idx].classList.remove('active'); dots[idx].classList.remove('active');
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add('active'); dots[idx].classList.add('active');
    }
    function next(){ go(idx+1); }
    function start(){ if(slides.length>1){ stop(); timer = setInterval(next, 4500); } }
    function stop(){ clearInterval(timer); }

    start();
    wrap.addEventListener('mouseenter', stop);
    wrap.addEventListener('mouseleave', start);
  }
  document.addEventListener('DOMContentLoaded', build);
})();
