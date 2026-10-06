type Observer = {name:string; access:string; request:string; answer:string; evidence:string; explanation:string; metadata:string};
const observers: Record<string,Observer> = {
  requester:{name:'Requester',access:'Outside this view',request:'Your own plaintext',answer:'Available after you open it',evidence:'Independently inspectable',explanation:'Your own prompt and opened answer are available to you. Receipt inspection is independent.',metadata:'Metadata may remain. A real protocol must define the boundaries beyond content encryption.'},
  payer:{name:'Payer',access:'Sample access choice available',request:'Outside this view',answer:'Outside this view',evidence:'Receipt identity absent',explanation:'Your access choice is available here. Request contents and receipt identifiers are absent.',metadata:'Shielded payment alone does not establish unlinkability. Protocol design and metadata handling also matter.'},
  relay:{name:'Relay',access:'Outside this view',request:'Ciphertext only',answer:'Sealed ciphertext only',evidence:'Outside this view',explanation:'The proposed transport carries ciphertext. It does not hold the prompt in plaintext.',metadata:'Metadata may remain. Encryption alone does not conceal all timing or network metadata.'},
  enclave:{name:'Enclave',access:'Payment identity absent',request:'Plaintext inside trusted boundary',answer:'Plaintext inside trusted boundary',evidence:'Execution declarations',explanation:'The proposed trusted boundary processes plaintext for inference. Isolation and attestation must be validated in a real implementation.',metadata:'The enclave is a trust boundary. This frontend contacts no hardware and demonstrates no attestation.'},
  verifier:{name:'Verifier',access:'Wallet and payment references absent',request:'Prompt contents absent',answer:'Answer contents absent',evidence:'Sample declarations available',explanation:'Inspect sample environment and workload declarations. Conversation contents and payment identities are absent.',metadata:'Environment attestation and proof of a particular computation are different mechanisms. This demo verifies neither.'}
};
export function initInteractions(hero: ReturnType<typeof initHero>) {
  document.querySelectorAll<HTMLInputElement>('[name=observer]').forEach(input=>input.addEventListener('change',()=>{
    const view=observers[input.value];
    const values: Record<string,string> = {'observer-name':view.name,'visibility-access':view.access,'visibility-request':view.request,'visibility-answer':view.answer,'visibility-evidence':view.evidence,'observer-description':view.explanation,'metadata-note':view.metadata};
    for(const [id,text] of Object.entries(values))document.getElementById(id)!.textContent=text;
  }));
  const focusPrompt=()=>{const prompt=document.getElementById('prompt')!;prompt.scrollIntoView();prompt.focus({preventScroll:true});};
  document.querySelectorAll<HTMLAnchorElement>('[data-focus-prompt]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();if(document.body.dataset.phase!=='ready')hero.reset();focusPrompt();}));
  document.getElementById('clear-session')!.addEventListener('click',()=>{hero.clearSession();focusPrompt();});
  document.querySelectorAll<HTMLAnchorElement>('.mobile-menu a').forEach(link=>link.addEventListener('click',()=>{document.querySelector<HTMLDetailsElement>('.mobile-menu')!.open=false;}));
  const presets: Record<string,string> = {strategy:'Sample prompt: Draft a launch strategy without exposing the brief.',code:'Sample prompt: Review the structure of a proposed implementation without exposing its source.',research:'Sample prompt: Compare two unfamiliar research directions without building a public profile.'};
  document.querySelectorAll<HTMLButtonElement>('[data-preset]').forEach(button=>button.addEventListener('click',()=>{hero.setDraft(presets[button.dataset.preset!]);focusPrompt();}));
  let accessMode='daily';
  const updateAccess=()=>{document.getElementById('access-mode-description')!.textContent=accessMode==='daily'?'Recurring daily compute · sample access':'Individual shielded ZEC request · sample access';document.getElementById('access-detail')!.textContent=accessMode==='daily'?'This sample shows the capacity route. No stake, reserve action or allowance is created.':'This sample shows the proposed shielded ZEC access route. No wallet connection or payment is made.';};
  document.querySelectorAll<HTMLInputElement>('[name=access-mode]').forEach(input=>input.addEventListener('change',()=>{accessMode=input.value;updateAccess();}));
  document.getElementById('explore-access')!.addEventListener('click',()=>{const button=document.getElementById('explore-access')!;const open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));document.getElementById('access-detail')!.hidden=open;});
}
import type { initHero } from './hero';
