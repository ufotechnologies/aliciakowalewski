import { Component } from './Component.js';
import { basePath } from '../utils/settings.js';
import { data } from '../utils/data.js';
import { html } from '../utils/html.js';

export class Navigation extends Component {
    constructor() {
        super();

        this.init();
    }

    init() {
        this.render();

        this.el = this.nodeList[0];
        this.links = this.el.querySelectorAll('a');

        this.addListeners();
    }

    render() {
        this.nodeList = html(/* html */ `
            <nav>
                <a href="${basePath}/" class="eyebrow">${data.get('title')}</a>
                <a href="${basePath}/about">About</a>
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
        this.setPath(path);
    };
}
