import gsap from 'gsap';

import { Home } from './pages/Home.js';
import { Article } from './pages/Article.js';

import { loadData } from './utils/data.js';

Promise.all([
    loadData(),
    document.fonts.ready // Preload fonts
]).then(() => {
    new Home();
    new Article();

    document.documentElement.classList.add('is-loaded');
});
