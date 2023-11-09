import { html } from '../utils/html.js';

export class HomeHeading {
    constructor(sectionData) {
        this.sectionData = sectionData;

        this.init();
    }

    init() {
        this.render();

        this.el = this.nodeList[0];
    }

    render() {
        const { heading } = this.sectionData;

        this.nodeList = html(/* html */ `
            <section class="fade-in-up">
                <h1>${heading}</h1>
            </section>
        `);
    }

    animateIn = () => {
        this.el.classList.add('visible');
    };
}
