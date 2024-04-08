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
        this.slider = this.el.querySelector('.slider-container');

        this.sectionData.images.forEach(data => {
            const figure = new Figure(data);
            this.slider.append(figure.el);
        });

        if (!navigator.maxTouchPoints) {
            this.isDown = false;
            this.startX = 0;
            this.scrollLeft = 0;
            this.minDistance = 8;

            this.enable();
        }
    }

    render() {
        this.nodeList = html(/* html */ `
            <section class="slider lazy">
                <div class="slider-wrapper">
                    <div class="slider-container grabbable">
                    </div>
                </div>
            </section>
        `);
    }

    addListeners() {
        this.slider.addEventListener('mousedown', this.onMouseDown);
        this.slider.addEventListener('mousemove', this.onMouseMove);
        this.slider.addEventListener('mouseleave', this.onMouseLeave);
        this.slider.addEventListener('click', this.onClick);
    }

    removeListeners() {
        this.slider.removeEventListener('mousedown', this.onMouseDown);
        this.slider.removeEventListener('mousemove', this.onMouseMove);
        this.slider.removeEventListener('mouseleave', this.onMouseLeave);
        this.slider.removeEventListener('click', this.onClick);
    }

    // Event handlers

    onMouseDown = e => {
        this.isDown = true;

        this.slider.classList.add('active');

        this.startX = e.pageX - this.slider.offsetLeft;
        this.scrollLeft = this.slider.scrollLeft;
    };

    onMouseMove = e => {
        if (!this.isDown) {
            return;
        }

        e.preventDefault();

        const x = e.pageX - this.slider.offsetLeft;
        const walk = x - this.startX;

        this.slider.scrollLeft = this.scrollLeft - walk;
    };

    onMouseLeave = () => {
        this.isDown = false;

        this.slider.classList.remove('active');
    };

    onClick = e => {
        this.isDown = false;

        this.slider.classList.remove('active');

        const x = e.pageX - this.slider.offsetLeft;
        const walk = x - this.startX;

        if (Math.abs(walk) > this.minDistance) {
            e.preventDefault();
        }
    };

    // Public methods

    animateIn = () => {
        this.el.classList.add('is-loaded');
    };

    enable = () => {
        this.addListeners();
    };

    disable = () => {
        this.removeListeners();
    };

    destroy = () => {
        this.disable();

        return super.destroy();
    };
}
