import { basePath } from '../utils/settings.js';
import { data } from '../utils/data.js';
import { html } from '../utils/html.js';

export class Navigation {
    constructor() {
        this.header = document.querySelector('header');

        this.init();
    }

    init() {
        this.render();

        this.header.append(...this.headerNodeList);
    }

    render() {
        this.headerNodeList = html(/* html */ `
            <nav>
                <a href="${basePath}/" class="eyebrow">${data.get('title')}</a>
                <a href="${basePath}/about">About</a>
            </nav>
        `);
    }
}
