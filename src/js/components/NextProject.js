import { Component } from './Component.js';
import { basePath } from '../utils/settings.js';
import { router } from '../utils/router.js';
import { html } from '../utils/html.js';

export class NextProject extends Component {
    constructor(sectionData) {
        super();

        this.sectionData = sectionData;

        this.init();
    }

    init() {
        this.render();

        this.el = this.nodeList[0];
        this.links = this.el.querySelectorAll('a');

        this.addListeners();
    }

    render() {
        const { back, next } = this.sectionData;

        this.nodeList = html(/* html */ `
            <nav class="next">
                <a href="${basePath}/projects/${back.slug.current}">Back</a>
                <a href="${basePath}/projects/${next.slug.current}">Next</a>
            </nav>
        `);
    }

    addListeners() {
        this.links.forEach(el => el.addEventListener('click', this.onClick));
    }

    // Event handlers

    onClick = e => {
        e.preventDefault();

        const path = e.currentTarget.getAttribute('href');
        router.setPath(path);
    };

    // Public methods

    animateIn = () => {
        this.el.classList.add('is-loaded');
    };
}
