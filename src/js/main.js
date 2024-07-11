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
    page: document.querySelector('main'),
    transition: new Transition()
});

const parallaxAssets = [];
document.querySelectorAll('.parallax').forEach(el => parallaxAssets.push(lazyLoad(el)));

await Promise.all([
    document.fonts.ready, // Preload fonts
    ...parallaxAssets
]);
document.documentElement.classList.add('is-loaded');
window.dispatchEvent(new Event('resize'));
