import { Component } from './Component.js';
import { Figure } from '../components/Figure.js';
import { html } from '../utils/html.js';

export class Slider extends Component {
    constructor(sectionData) {
        super();

        this.sectionData = sectionData;

        this.init();
    }

    init() {
        this.render();

        this.el = this.nodeList[0];
        this.container = this.el.querySelector('.slider-container');

        this.sectionData.images.forEach(data => {
            const figure = new Figure(data);
            this.container.append(figure.el);
        });
    }

    render() {
        this.nodeList = html(/* html */ `
            <section class="slider lazy">
                <div class="slider-wrapper">
                    <div class="slider-container">
                    </div>
                </div>
            </section>
        `);
    }

    animateIn = () => {
        this.el.classList.add('is-loaded');
    };
}
