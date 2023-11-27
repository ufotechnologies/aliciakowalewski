import gsap from 'gsap';

import { Home } from './pages/Home.js';
import { About } from './pages/About.js';
import { Article } from './pages/Article.js';

import { loadData } from './utils/data.js';
import { lazyLoad } from './utils/lazyLoad.js';

await loadData();
new Home();
new About();
new Article();

const assets = [];
document.querySelectorAll('.scroll-lazy').forEach(el => assets.push(lazyLoad(el)));

await Promise.all([
    document.fonts.ready, // Preload fonts
    ...assets
]);
document.documentElement.classList.add('is-loaded');
