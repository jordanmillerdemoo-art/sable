import './site.css';
import { initHero } from './hero';
import { initInteractions } from './interactions';
import { initReceipt } from './receipt';
import { initDepth } from './motion';
const hero=initHero();
initInteractions(hero);
initReceipt();
initDepth();
