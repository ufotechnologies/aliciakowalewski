import { Home } from './pages/Home.js';
import { About } from './pages/About.js';
import { Article } from './pages/Article.js';
import { Transition } from './components/Transition.js';
import { basePath } from './utils/settings.js';
import { router } from './utils/router.js';
import { loadData } from './utils/data.js';
import { lazyLoad } from './utils/lazyLoad.js';

await loadData();
router.add('/', Home);
router.add('/about', About);
router.add('/projects', Article);
router.init({
    path: basePath,
    page: document.querySelector('article'),
    transition: new Transition()
});

const assets = [];
document.querySelectorAll('.scroll-lazy').forEach(el => assets.push(lazyLoad(el)));

await Promise.all([
    document.fonts.ready, // Preload fonts
    ...assets
]);
document.documentElement.classList.add('is-loaded');
