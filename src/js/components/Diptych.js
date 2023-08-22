import { data } from '../utils/data.js';
import { html } from '../utils/html.js';

export class Diptych {
    constructor(sectionData) {
        this.sectionData = sectionData;

        this.data = [
            {
                media: this.sectionData.media1,
                label: this.sectionData.label1,
                caption: this.sectionData.caption1
            },
            {
                media: this.sectionData.media2,
                label: this.sectionData.label2,
                caption: this.sectionData.caption2
            }
        ];

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const { indent } = this.sectionData;

        this.nodeList = html(/* html */ `
            <figure class="diptych${indent ? ' indent' : ''}">
                ${this.data.map(({ media, label, caption }) => {
                    const image = data.get('assets').find(doc => doc._id === media.asset._ref).url;
                    const mobileImage = `${image}?h=600&fit=crop&crop=center&sharp=25&auto=format`;
                    const desktopImage = `${image}?h=1568&fit=min&auto=format`;

                    return /* html */ `
                        <div class="image">
                            <img srcset="${mobileImage} 750w, ${desktopImage} 1000w" sizes="(orientation: portrait) 750px, 100vw" src="${desktopImage}">
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
}
