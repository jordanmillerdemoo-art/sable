import { readFile, readdir } from 'node:fs/promises';
const tokens = await readFile(new URL('../tokens.css', import.meta.url), 'utf8');
const definitions = new Set([...tokens.matchAll(/(--[\w-]+)\s*:/g)].map(match => match[1]));
for (const name of await readdir(new URL('../src/', import.meta.url))) {
  if (!name.endsWith('.css')) continue;
  const css = await readFile(new URL(`../src/${name}`, import.meta.url), 'utf8');
  const missing = [...css.matchAll(/var\((--[\w-]+)/g)].map(match => match[1]).filter(token => !definitions.has(token));
  if (missing.length) throw new Error(`Undefined tokens in ${name}: ${missing.join(', ')}`);
}
console.log('Design token references validated.');
