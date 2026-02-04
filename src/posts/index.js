import AiBiotechGenetics from './ai-biotech-genetics.jsx';
import CodeToKinase from './code-to-kinase.jsx';
import MastersOrigin from './masters-origin.jsx';
import ScrollSystems from './scroll-systems.jsx';

import { metadata as aiBioMeta } from './meta/ai-biotech-genetics.js';
import { metadata as codeToKinaseMeta } from './meta/code-to-kinase.js';
import { metadata as mastersOriginMeta } from './meta/masters-origin.js';
import { metadata as scrollSystemsMeta } from './meta/scroll-systems.js';

const posts = [
  { Component: AiBiotechGenetics, slug: 'ai-biotech-genetics', link: '/blog/ai-biotech-genetics', ...aiBioMeta },
  { Component: CodeToKinase, slug: 'code-to-kinase', link: '/blog/code-to-kinase', ...codeToKinaseMeta },
  { Component: MastersOrigin, slug: 'masters-origin', link: '/blog/masters-origin', ...mastersOriginMeta },
  { Component: ScrollSystems, slug: 'scroll-systems', link: '/blog/scroll-systems', ...scrollSystemsMeta },
];

export default posts;
