import { html } from '../utils/html.js';

export class Section {
    constructor(sectionData) {
        this.sectionData = sectionData;

        this.init();
    }

    init() {
        this.render();

        this.el = this.nodeList[0];
    }

    render() {
        const { heading, description } = this.sectionData;

        this.nodeList = html(/* html */ `
            <section class="fade-in-up">
                ${heading ? /* html */ `<h1>${heading}</h1>` : ''}
                ${description ? /* html */ `<div>${description.replace(/\n/g, '<br>').replace(/<br><br><br>(.+?)(<br>)/g, '<br><br><br><strong>$1</strong>$2')}</div>` : ''}
            </section>
        `);
    }

    animateIn = () => {
        this.el.classList.add('visible');
    };
}
