import { html } from '../utils/html.js';

export class SectionProject {
    constructor(sectionData) {
        this.sectionData = sectionData;

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const { title, description } = this.sectionData;

        this.nodeList = html(/* html */ `
            <section>
                ${title ? /* html */ `<h1>${title}</h1>` : ''}
                ${description ? /* html */ `<div>${description.replace(/\n/g, '<br>').replace(/<br><br><br>(.+?)(<br>)/g, '<br><br><br><strong>$1</strong>$2')}</div>` : ''}
            </section>
        `);
    }
}
