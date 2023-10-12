import { html } from '../utils/html.js';

export class HomeHeading {
    constructor(sectionData) {
        this.sectionData = sectionData;

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const { heading } = this.sectionData;

        this.nodeList = html(/* html */ `
            <section>
                <h1>${heading}</h1>
            </section>
        `);
    }
}
