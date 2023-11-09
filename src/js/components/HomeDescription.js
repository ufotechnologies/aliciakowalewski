import { html } from '../utils/html.js';

export class HomeDescription {
    constructor(sectionData) {
        this.sectionData = sectionData;

        this.init();
    }

    init() {
        this.render();

        this.el = this.nodeList[0];
    }

    render() {
        const { description } = this.sectionData;

        this.nodeList = html(/* html */ `
            <section class="fade-in-up">
                <h2>${description}</h2>
                <!-- <svg width="12" height="31" viewBox="0 0 12 31" fill="currentColor"><path d="M5.46967 30.5303C5.76256 30.8232 6.23744 30.8232 6.53033 30.5303L11.3033 25.7574C11.5962 25.4645 11.5962 24.9896 11.3033 24.6967C11.0104 24.4038 10.5355 24.4038 10.2426 24.6967L6 28.9393L1.75736 24.6967C1.46447 24.4038 0.989593 24.4038 0.696699 24.6967C0.403806 24.9896 0.403806 25.4645 0.696699 25.7574L5.46967 30.5303ZM5.25 0L5.25 30H6.75L6.75 0L5.25 0Z"/></svg> -->
            </section>
        `);
    }

    animateIn = () => {
        this.el.classList.add('visible');
    };
}
