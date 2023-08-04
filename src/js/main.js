import gsap from 'gsap';

Promise.all([
    document.fonts.ready // Preload fonts
]).then(() => {
    document.documentElement.classList.add('is-loaded');
});
