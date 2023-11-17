import { data } from '../utils/data.js';
import { html } from '../utils/html.js';

export class Figure {
    constructor(sectionData) {
        this.sectionData = sectionData;

        this.init();
    }

    init() {
        this.render();

        this.el = this.nodeList[0];
    }

    render() {
        const { indent, image, featuredImage, label, caption, mp4 } = this.sectionData;

        if (mp4) {
            this.nodeList = html(/* html */ `
                <figure class="${indent ? 'indent' : ''} scroll-lazy">
                    <video autoplay muted loop playsinline src="${mp4}"></video>
                    <figcaption>
                        ${label ? /* html */ `<div><strong>${label}</strong></div>` : ''}
                        ${caption ? /* html */ `<div>${caption}</div>` : ''}
                    </figcaption>
                </figure>
            `);
        } else if (image) {
            const asset = data.get('assets').find(doc => doc._id === image.asset._ref);
            const src = `${asset.url}?h=1568&fit=min&auto=format`;
            const width = asset.metadata.dimensions.width;
            const height = asset.metadata.dimensions.height;

            this.nodeList = html(/* html */ `
                <figure class="${indent ? 'indent' : ''} scroll-lazy">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 0 0'%3E%3C/svg%3E" data-src="${src}" width="${width}" height="${height}">
                    <figcaption>
                        ${label ? /* html */ `<div><strong>${label}</strong></div>` : ''}
                        ${caption ? /* html */ `<div>${caption}</div>` : ''}
                    </figcaption>
                </figure>
            `);
        } else if (featuredImage) {
            const asset = data.get('assets').find(doc => doc._id === featuredImage.image.asset._ref);
            const src = `${asset.url}?h=1568&fit=min&auto=format`;
            const width = asset.metadata.dimensions.width;
            const height = asset.metadata.dimensions.height;

            this.nodeList = html(/* html */ `
                <figure class="scroll-lazy">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 0 0'%3E%3C/svg%3E" data-src="${src}" width="${width}" height="${height}">
                    <figcaption>
                        ${featuredImage.label ? /* html */ `<div><strong>${featuredImage.label}</strong></div>` : ''}
                        ${featuredImage.caption ? /* html */ `<div>${featuredImage.caption}</div>` : ''}
                    </figcaption>
                </figure>
            `);
        } else {
            this.nodeList = html(/* html */ `
                <figure class="scroll-lazy">
                </figure>
            `);
        }
    }

    animateIn = () => {
        this.el.classList.add('is-loaded');
    };
}
