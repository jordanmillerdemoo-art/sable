export function initDepth() {
  const enclave=document.getElementById('enclave')!;
  const art=enclave.querySelector<SVGSVGElement>('svg')!;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let visible=false,frame=0,top=0,height=0;
  const measure=()=>{const rect=enclave.getBoundingClientRect();top=rect.top+scrollY;height=rect.height;};
  const draw=()=>{
    frame=0;
    const moving=!['ready','complete'].includes(document.body.dataset.phase||'ready');
    const amount=moving||reduced.matches?0:Math.min(1,Math.max(0,(scrollY+innerHeight-top)/(innerHeight+height)));
    art.style.setProperty('--site-depth-shift',`calc(var(--motion-parallax-range) * ${amount})`);
  };
  const schedule=()=>{if(visible&&!document.hidden&&!frame)frame=requestAnimationFrame(draw);};
  measure();
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){measure();schedule();}else if(frame){cancelAnimationFrame(frame);frame=0;}}).observe(enclave);
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',()=>{measure();schedule();});
  document.addEventListener('sable-state',()=>{measure();draw();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame){cancelAnimationFrame(frame);frame=0;}else schedule();});
  reduced.addEventListener('change',draw);
}
