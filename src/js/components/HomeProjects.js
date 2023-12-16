import { Project } from './Project.js';

import { html } from '../utils/html.js';

export class HomeProjects {
    constructor(sectionData) {
        this.sectionData = sectionData;

        this.init();
    }

    init() {
        this.render();

        this.el = this.nodeList[0];

        this.sectionData.forEach(section => {
            const project = new Project(section);
            this.el.append(project.el);
        });
    }

    render() {
        this.nodeList = html(/* html */ `
            <section class="projects scroll-lazy">
            </section>
        `);
    }

    animateIn = () => {
        this.el.classList.add('is-loaded');
    };
}
