export const sampleReceipt = Object.freeze({sample:true,verified:false,schema:'sable.sample.receipt.v1',id:'SAMPLE-RECEIPT-01',model:'SABLE demo model',environment:'GPU enclave · simulated',workload:'Inference · sample',freshness:'Demo session · sample',completion:'Sample complete'});
export function downloadSampleReceipt() {
  const url=URL.createObjectURL(new Blob([JSON.stringify(sampleReceipt,null,2)],{type:'application/json'}));
  const anchor=document.createElement('a');anchor.href=url;anchor.download='sable-sample-receipt.json';anchor.click();
  const cleanup=cssTimeToMilliseconds(getComputedStyle(document.documentElement).getPropertyValue('--duration-download-cleanup'));
  setTimeout(()=>URL.revokeObjectURL(url),cleanup);
}
type Declaration={title:string;value:string;explanation:string;scope:string};
const fields: Record<string,Declaration> = {
  identifier:{title:'Receipt identifier',value:sampleReceipt.id,explanation:'A fictional reference for this demo object. It is not a payment or wallet identifier, and is independent of your request contents.',scope:'A real system must define how its evidence objects are identified without introducing a payment correlation.'},
  model:{title:'Model',value:sampleReceipt.model,explanation:'A sample model identity declaration. In a real system, an identity would need a defined binding to the workload and a supported verification procedure.',scope:'A declaration alone does not prove which model ran. This demo invokes no model.'},
  environment:{title:'Environment',value:sampleReceipt.environment,explanation:'A placeholder for evidence about the proposed trusted execution environment. A real verifier would need a supported attestation scheme and its validation procedure.',scope:'This sample contacts no hardware and verifies no environment.'},
  workload:{title:'Workload',value:sampleReceipt.workload,explanation:'A sample description of the execution task. A real receipt would specify what its evidence binds to, without publishing conversation contents.',scope:'No live inference took place. A workload label is not a mathematical proof of computation.'},
  freshness:{title:'Freshness',value:sampleReceipt.freshness,explanation:'A placeholder for an execution freshness mechanism. A real protocol would need to define replay protection within its privacy boundaries.',scope:'This is not an on-chain timestamp, a payment event time, or real freshness evidence.'},
  completion:{title:'Completion',value:sampleReceipt.completion,explanation:'A demonstration state showing where completion evidence would be read. No attestation or execution verification was performed.',scope:'Sample complete describes this frontend demonstration. It establishes no real execution claim.'}
};
export function focusReceiptInspector() {
  document.getElementById('evidence')!.scrollIntoView();
  document.getElementById('inspector-heading')!.focus({preventScroll:true});
}
export function initReceipt() {
  document.querySelectorAll<HTMLButtonElement>('[data-field]').forEach(button=>button.addEventListener('click',()=>{
    const selected=button.dataset.field!;const field=fields[selected];
    document.querySelectorAll<HTMLButtonElement>('[data-field]').forEach(item=>item.setAttribute('aria-pressed',String(item.dataset.field===selected)));
    document.getElementById('inspector-heading')!.textContent=field.title;
    document.getElementById('inspector-value')!.textContent=field.value;
    document.getElementById('evidence-description')!.textContent=field.explanation;
    document.getElementById('evidence-limit')!.textContent=field.scope;
  }));
  document.getElementById('download-receipt')!.addEventListener('click',downloadSampleReceipt);
  document.querySelectorAll<HTMLAnchorElement>('[data-inspect-evidence]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();focusReceiptInspector();}));
}
import { cssTimeToMilliseconds } from './css-time';
