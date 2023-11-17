// https://web.dev/lazy-loading-video/

export function lazyLoad(el) {
    let els;

    if (el.tagName !== 'IMG' && el.tagName !== 'VIDEO') {
        els = el.querySelectorAll('img, video');
    } else {
        els = [el];
    }

    if (!els.length) {
        return Promise.resolve();
    }

    const promises = [];

    els.forEach(el => {
        const data = el.dataset;

        if (data.src) {
            el.src = data.src;

            if (el.tagName === 'VIDEO') {
                el.load();
            }
        }

        if (data.style) {
            el.style = data.style;
        }

        let promise;

        if (el.tagName === 'IMG' && !el.complete) {
            promise = new Promise(resolve => {
                el.onload = () => {
                    resolve();

                    el.onload = null;
                };
            });
        } else {
            promise = Promise.resolve();
        }

        promises.push(promise);
    });

    return Promise.all(promises);
}
