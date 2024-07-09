import { Component } from './Component.js';
import { assetSize } from '../utils/settings.js';
import { data } from '../utils/data.js';
import { html } from '../utils/html.js';

export class Diptych extends Component {
    constructor(sectionData) {
        super();

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
            <figure class="diptych${indent ? ' indent' : ''} lazy">
                ${this.data.map(({ image, label, caption }) => {
                    const asset = data.get('assets').find(doc => doc._id === image.asset._ref);
                    const dimensions = asset.metadata.dimensions.aspectRatio > 1 ? `h=${assetSize}` : `w=${assetSize}`;
                    const src = `${asset.url}?${dimensions}&fit=min&auto=format`;
                    const width = asset.metadata.dimensions.aspectRatio > 1 ? Math.round(assetSize * asset.metadata.dimensions.aspectRatio) : assetSize;
                    const height = asset.metadata.dimensions.aspectRatio > 1 ? assetSize : Math.round(assetSize / asset.metadata.dimensions.aspectRatio);

                    return /* html */ `
                        <div class="image">
                            <img src="${src}" width="${width}" height="${height}">
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
