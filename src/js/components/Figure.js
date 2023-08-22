import { data } from '../utils/data.js';
import { html } from '../utils/html.js';

export class Figure {
    constructor(sectionData) {
        this.sectionData = sectionData;

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const { indent, image, featuredImage, label, caption, mp4 } = this.sectionData;

        if (mp4) {
            this.nodeList = html(/* html */ `
                <figure class="${indent ? 'indent' : ''}">
                    <video autoplay muted loop playsinline src="${mp4}"></video>
                    <figcaption>
                        ${label ? /* html */ `<div><strong>${label}</strong></div>` : ''}
                        ${caption ? /* html */ `<div>${caption}</div>` : ''}
                    </figcaption>
                </figure>
            `);
        } else if (image) {
            const url = data.get('assets').find(doc => doc._id === image.asset._ref).url;
            const mobileImage = `${url}?h=600&fit=crop&crop=center&sharp=25&auto=format`;
            const desktopImage = `${url}?h=1568&fit=min&auto=format`;

            this.nodeList = html(/* html */ `
                <figure class="${indent ? 'indent' : ''}">
                    <img srcset="${mobileImage} 750w, ${desktopImage} 1000w" sizes="100vw" src="${desktopImage}">
                    <figcaption>
                        ${label ? /* html */ `<div><strong>${label}</strong></div>` : ''}
                        ${caption ? /* html */ `<div>${caption}</div>` : ''}
                    </figcaption>
                </figure>
            `);
        } else if (featuredImage) {
            const url = data.get('assets').find(doc => doc._id === featuredImage.image.asset._ref).url;
            const mobileImage = `${url}?h=600&fit=crop&crop=center&sharp=25&auto=format`;
            const desktopImage = `${url}?h=1568&fit=min&auto=format`;

            this.nodeList = html(/* html */ `
                <figure>
                    <img srcset="${mobileImage} 750w, ${desktopImage} 1000w" sizes="100vw" src="${desktopImage}">
                    <figcaption>
                        ${featuredImage.label ? /* html */ `<div><strong>${featuredImage.label}</strong></div>` : ''}
                        ${featuredImage.caption ? /* html */ `<div>${featuredImage.caption}</div>` : ''}
                    </figcaption>
                </figure>
            `);
        } else {
            this.nodeList = html(/* html */ `
                <figure>
                </figure>
            `);
        }
    }
}
