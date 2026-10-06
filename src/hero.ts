import { focusReceiptInspector } from './receipt';
import { cssTimeToMilliseconds } from './css-time';
export function initHero() {
  const $ = <T extends HTMLElement = HTMLElement>(id: string): T => document.getElementById(id) as T;
  const root = document.documentElement;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let generation = 0, running = false, animations: Animation[] = [], savedDraft = '', layoutWidth = innerWidth;
  const token = (name: string) => getComputedStyle(root).getPropertyValue(name).trim();
  const duration = (name: string) => cssTimeToMilliseconds(token(name));
  const phase = (value: string,text: string) => { document.body.dataset.phase=value; $('stage').textContent=text; document.dispatchEvent(new CustomEvent('sable-state',{detail:value}));if(value==='ready')$<HTMLButtonElement>('open-answer').textContent='Open sample answer ↗'; };
  const cancel = () => { generation++; animations.forEach(a=>a.cancel()); animations=[]; ['traveller','answer-flight','receipt-flight'].forEach(id=>$ (id).hidden=true); running=false; $<HTMLButtonElement>('seal').disabled=false; $('skip').hidden=true; };
  const sleep = (ms: number,g: number) => new Promise<boolean>(resolve=>setTimeout(()=>resolve(g===generation),ms));
  const point = (el: Element) => {const r=el.getBoundingClientRect();return {x:r.left+r.width/2+scrollX,y:r.top+r.height/2+scrollY};};
  const move = async (el: HTMLElement, points: {x:number;y:number}[], ms: number, g: number, conceal=false) => {
    if(g!==generation)return false;
    el.hidden=false;
    const r=el.getBoundingClientRect();
    const frames=points.map((p,i)=>({transform:`translate(${p.x-r.width/2}px,${p.y-r.height/2}px) scale(${conceal&&i===points.length-1?token('--scale-concealed'):token('--scale-rest')})`,opacity:conceal&&i===points.length-1?token('--opacity-none'):token('--opacity-full')}));
    const a=el.animate(frames,{duration:ms,easing:token('--ease-precise'),fill:'forwards'});animations.push(a);
    try{await a.finished;}catch{return false;}el.hidden=true;a.cancel();return g===generation;
  };
  function complete(){ cancel(); phase('complete','Complete / sample execution produced two independent outputs.');$('receipt-state').textContent='Arrived / sample output';$('inference-label').textContent='04 / Inference · sample complete';$('answer-status').textContent='Sealed sample output';$<HTMLButtonElement>('open-answer').disabled=false;$<HTMLButtonElement>('secondary-answer').disabled=false; }
  function reset(clearDraft=false){if(clearDraft)savedDraft='';const draft=clearDraft?'':savedDraft||$<HTMLTextAreaElement>('prompt').value;cancel();phase('ready','Ready / seal a request to follow its isolated path.');$<HTMLTextAreaElement>('prompt').value=draft;$<HTMLTextAreaElement>('prompt').hidden=false;$<HTMLTextAreaElement>('prompt').disabled=false;document.querySelector<HTMLElement>('.cipher-source')!.hidden=true;document.querySelector<HTMLElement>('.cipher-source')!.classList.remove('reduced-history');$('receipt-state').textContent='Pre-run sample specimen';$('inference-label').textContent='04 / Inference · demo idle';$('answer-status').textContent='Output destination';$<HTMLButtonElement>('open-answer').disabled=true;$<HTMLButtonElement>('open-answer').setAttribute('aria-expanded','false');setAnswerOpen(false);$<HTMLButtonElement>('secondary-answer').disabled=true;$('error').hidden=true;}
  $('request-form').addEventListener('submit',async e=>{
    e.preventDefault();if(running)return;if(!$<HTMLTextAreaElement>('prompt').value.trim()){$('error').hidden=false;$<HTMLTextAreaElement>('prompt').focus();return;}
    const currentDraft=$<HTMLTextAreaElement>('prompt').value;reset();savedDraft=currentDraft;$<HTMLTextAreaElement>('prompt').value=currentDraft;layoutWidth=innerWidth;running=true;const g=++generation;const startingScroll=scrollY;$<HTMLButtonElement>('seal').disabled=true;$('skip').hidden=false;$('skip').focus({preventScroll:true});$<HTMLTextAreaElement>('prompt').disabled=true;
    phase('encrypting','Encrypt / the readable request becomes an opaque demo transport object.');
    if(motion.matches){$<HTMLTextAreaElement>('prompt').hidden=true;document.querySelector<HTMLElement>('.cipher-source')!.hidden=false;document.querySelector<HTMLElement>('.cipher-source')!.classList.add('reduced-history');complete();return;}
    const conceal=$<HTMLTextAreaElement>('prompt').animate([{opacity:token('--opacity-full'),transform:`scale(${token('--scale-rest')})`},{opacity:token('--opacity-none'),transform:`scale(${token('--scale-concealed')})`}],{duration:duration('--refined-transform-duration'),easing:token('--ease-precise'),fill:'forwards'});animations.push(conceal);try{await conceal.finished;}catch{return;}if(g!==generation)return;
    $<HTMLTextAreaElement>('prompt').hidden=true;conceal.cancel();document.querySelector<HTMLElement>('.cipher-source')!.hidden=false;
    if(!await sleep(duration('--duration-stage'),g))return;
    phase('transit','Relay / sample ciphertext leaves the request area. No plaintext travels.');
    // Read layout once for each leg. Animation interpolation never reads layout.
    const source=point(document.querySelector<HTMLElement>('.cipher-source')!),relay=point($('relay')),entry=point(document.querySelector<SVGPathElement>('.instrument-aperture')!);
    if(!await move($('traveller'),[source,relay],duration('--refined-transit-duration'),g))return;
    phase('entering','Enclave / ciphertext enters the protected boundary and disappears.');
    if(!await move($('traveller'),[relay,entry],duration('--refined-transit-duration'),g,true))return;
    phase('processing','Inference / finite simulated activity inside the opaque enclave.');$('inference-label').textContent='04 / Simulated inference';
    // A compact journey follows a user's submission once; their own scrolling wins.
    if(getComputedStyle(document.querySelector('.hero-output-column')!).display==='contents'&&scrollY===startingScroll)$('enclave').scrollIntoView({block:'start',behavior:'smooth'});
    if(!await sleep(duration('--refined-inference-duration'),g))return;
    phase('splitting','Outputs / a common execution origin separates into answer and evidence.');
    const origin=point(document.querySelector<SVGPathElement>('.instrument-slit')!),answer=point($('answer')),receipt=point($('receipt'));
    const results=await Promise.all([move($('answer-flight'),[origin,answer],duration('--refined-output-duration'),g),move($('receipt-flight'),[origin,receipt],duration('--refined-output-duration'),g)]);
    if(results.every(Boolean)&&g===generation)complete();
  });
  $('skip').addEventListener('click',complete);$('reset').addEventListener('click',()=>{reset();$<HTMLTextAreaElement>('prompt').focus();});
  $<HTMLButtonElement>('open-answer').addEventListener('click',toggleAnswer);
  $<HTMLButtonElement>('secondary-answer').addEventListener('click',toggleAnswer);
  $('inspect').addEventListener('click',focusReceiptInspector);
  document.querySelectorAll<HTMLInputElement>('[name=access]').forEach(input=>input.addEventListener('change',()=>{$('access-copy').textContent=input.value==='zec'?'Individual requests through proposed shielded ZEC access.':'Stake or reserve for recurring daily compute · sample access.';}));
  addEventListener('resize',()=>{const changed=innerWidth!==layoutWidth;layoutWidth=innerWidth;if(running&&changed){reset();$('stage').textContent='Layout changed / request reset. Seal again to follow the adapted route.';}});
  motion.addEventListener('change',()=>{if(running&&motion.matches){$<HTMLTextAreaElement>('prompt').hidden=true;document.querySelector<HTMLElement>('.cipher-source')!.hidden=false;complete();}});
  function setAnswerOpen(open:boolean){
    for(const id of ['open-answer','secondary-answer']){
      $(id).setAttribute('aria-expanded',String(open));
      $(id).textContent=open?'Close sample answer':'Open sample answer';
    }
    $('answer-content').hidden=!open;$('secondary-answer-content').hidden=!open;
  }
  function toggleAnswer(){setAnswerOpen($('open-answer').getAttribute('aria-expanded')!=='true');}
  $<HTMLButtonElement>('secondary-answer').disabled=true;
  return {reset,clearSession:()=>reset(true),setDraft:(value:string)=>{reset(true);$<HTMLTextAreaElement>('prompt').value=value;}};

}
