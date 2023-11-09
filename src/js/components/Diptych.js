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
            <figure class="diptych${indent ? ' indent' : ''} fade-in-up">
                ${this.data.map(({ image, label, caption }) => {
                    const url = data.get('assets').find(doc => doc._id === image.asset._ref).url;
                    const mobileImage = `${url}?h=600&fit=crop&crop=center&sharp=25&auto=format`;
                    const desktopImage = `${url}?h=1568&fit=min&auto=format`;

                    return /* html */ `
                        <div class="image">
                            <img srcset="${mobileImage} 750w, ${desktopImage} 1000w" sizes="100vw" src="${desktopImage}">
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
        this.el.classList.add('visible');
    };
}
