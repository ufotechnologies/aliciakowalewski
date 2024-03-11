import { Component } from './Component.js';
import { Project } from './Project.js';
import { data } from '../utils/data.js';
import { html } from '../utils/html.js';

export class HomeProjects extends Component {
    constructor() {
        super();

        this.data = data.get('projects');

        this.init();
    }

    init() {
        this.render();

        this.el = this.nodeList[0];

        this.data.forEach(section => {
            const project = new Project(section);
            this.el.append(project.el);
        });
    }

    render() {
        this.nodeList = html(/* html */ `
            <section class="projects lazy">
            </section>
        `);
    }

    animateIn = () => {
        this.el.classList.add('is-loaded');
    };
}
