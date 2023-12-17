import { Transition } from '../components/Transition.js';
import { basePath } from './settings.js';

export const transition = new Transition();
export const router = new Map();
let lastPage = null;
let nextPage = null;
let isTransitioning = false;

history.scrollRestoration = 'manual';

window.addEventListener('popstate', onPopState);

function replacePage(Page) {
    window.scrollTo(0, 0);

    const page = new Page();
    const article = document.querySelector('article');
    article.parentNode.replaceChild(page.el, article);

    if (lastPage && lastPage.destroy) {
        lastPage.destroy();
    }

    lastPage = page;

    transition.animateOut(() => {
        if (page.animateIn) {
            page.animateIn();
        }

        isTransitioning = false;
    });
}

function transitionPage() {
    if (lastPage) {
        if (lastPage.animateOut) {
            lastPage.animateOut();
        }

        transition.animateIn(() => {
            replacePage(nextPage);
        });
    } else {
        replacePage(nextPage);
    }
}

export function onPopState() {
    const Page = router.get(`/${location.pathname.replace(basePath, '').split('/')[1]}`);

    if (Page) {
        nextPage = Page;

        if (!isTransitioning) {
            isTransitioning = true;

            transitionPage();
        }
    }
}
