import { Component } from './Component.js';
import { html } from '../utils/html.js';

export class HomeFooter extends Component {
    constructor() {
        super();

        this.init();
    }

    init() {
        this.render();

        this.el = this.nodeList[0];
    }

    render() {
        this.nodeList = html(/* html */ `
            <footer>
            </footer>
        `);
    }

    animateIn = () => {
        this.el.classList.add('is-loaded');
    };
}
