import { assetHeight } from '../utils/settings.js';
import { data } from '../utils/data.js';
import { html } from '../utils/html.js';

export class Diptych {
    constructor(sectionData) {
        this.sectionData = sectionData;

        this.data = [
            {
                image: this.sectionData.image1,
                label: this.sectionData.label1,
                caption: this.sectionData.caption1
            },
            {
                image: this.sectionData.image2,
                label: this.sectionData.label2,
                caption: this.sectionData.caption2
            }
        ];

        this.init();
    }

    init() {
        this.render();

        this.el = this.nodeList[0];
    }

    render() {
        const { indent } = this.sectionData;

        this.nodeList = html(/* html */ `
            <figure class="diptych${indent ? ' indent' : ''} scroll-lazy">
                ${this.data.map(({ image, label, caption }) => {
                    const asset = data.get('assets').find(doc => doc._id === image.asset._ref);
                    const src = `${asset.url}?h=${assetHeight}&fit=min&auto=format`;
                    const width = Math.round(assetHeight * asset.metadata.dimensions.aspectRatio);

                    return /* html */ `
                        <div class="image">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 0 0'%3E%3C/svg%3E" data-src="${src}" width="${width}" height="${assetHeight}">
                            <figcaption>
                                ${label ? /* html */ `<div><strong>${label}</strong></div>` : ''}
                                ${caption ? /* html */ `<div>${caption}</div>` : ''}
                            </figcaption>
                        </div>
                    `;
                }).join('')}
            </figure>
        `);
    }

    animateIn = () => {
        this.el.classList.add('is-loaded');
    };
}
