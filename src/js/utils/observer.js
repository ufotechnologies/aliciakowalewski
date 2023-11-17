import { lazyLoad } from './lazyLoad.js';

export const observer = new IntersectionObserver(onIntersect);
export const observerMap = new Map();

export function observe(el, object) {
    observer.observe(el);
    observerMap.set(el, object);
}

export function unobserve(el) {
    observer.unobserve(el);
    observerMap.delete(el);
}

export function onIntersect(entries) {
    entries.forEach(entry => {
        const object = observerMap.get(entry.target);

        if (object && object.animateIn && entry.isIntersecting) {
            lazyLoad(entry.target).then(object.animateIn);
            unobserve(entry.target);
        }
    });
}
