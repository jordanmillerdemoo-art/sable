/** Convert a computed CSS time to the milliseconds expected by browser APIs. */
export function cssTimeToMilliseconds(value: string): number {
  const match=/^([+-]?(?:\d+\.?\d*|\.\d+))(ms|s)$/.exec(value.trim());
  if(!match)throw new Error(`Invalid CSS time: ${value}`);
  return Number(match[1])*(match[2]==='s'?1000:1);
}
