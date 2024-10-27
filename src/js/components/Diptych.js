import { Component } from './Component.js';

import { assetHeight, assetWidth } from '../utils/settings.js';
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
                    const asset = data.get('images').find(doc => doc._id === image.asset._ref);
                    const dimensions = asset.metadata.dimensions.aspectRatio > 1 ? `h=${assetHeight}` : `w=${assetWidth}`;
                    const src = `${asset.url}?${dimensions}&fit=min&fm=webp`;
                    const width = asset.metadata.dimensions.aspectRatio > 1 ? Math.round(assetHeight * asset.metadata.dimensions.aspectRatio) : assetWidth;
                    const height = asset.metadata.dimensions.aspectRatio > 1 ? assetHeight : Math.round(assetWidth / asset.metadata.dimensions.aspectRatio);

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
