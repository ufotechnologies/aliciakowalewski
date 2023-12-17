import { Component } from './Component.js';
import { html } from '../utils/html.js';

export class HomeHeading extends Component {
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
        const { heading } = this.sectionData;

        this.nodeList = html(/* html */ `
            <section class="scroll-lazy">
                <h1>${heading}</h1>
            </section>
        `);
    }

    animateIn = () => {
        this.el.classList.add('is-loaded');
    };
}
