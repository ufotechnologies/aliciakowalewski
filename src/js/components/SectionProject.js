import { Component } from './Component.js';

import { html } from '../utils/html.js';

export class SectionProject extends Component {
    constructor(sectionData) {
        super();

        this.sectionData = sectionData;

        this.init();
    }

    init() {
        this.render();

        this.el = this.nodeList[0];
    }

    render() {
        const { title, tags, description, featuredImage } = this.sectionData;

        this.nodeList = html(/* html */ `
            <section>
                ${title ? /* html */ `
<h1>
    ${title}
    <span>
        ${tags ? `${tags.join('<br>')}` : ''}
    </span>
</h1>
` : ''}
                ${description ? /* html */ `<div>${description.replace(/\n/g, '<br>').replace(/<br><br><br>(.+?)(<br>)/g, '<br><br><br><strong>$1</strong>$2')}</div>` : ''}
                ${featuredImage.caption ? /* html */ `<figcaption>${featuredImage.caption}</figcaption>` : ''}
            </section>
        `);
    }

    animateIn = () => {
        this.el.classList.add('is-loaded');
    };
}
