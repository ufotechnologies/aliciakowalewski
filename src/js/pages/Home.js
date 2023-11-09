import { Page } from './Page.js';
import { HomeHeading } from '../components/HomeHeading.js';
import { HomeProjects } from '../components/HomeProjects.js';

import { data } from '../utils/data.js';
import { observe } from '../utils/observer.js';

export class Home extends Page {
    constructor() {
        super();

        this.el = document.querySelector('body.home');

        if (this.el) {
            this.data = data.get('home');
            this.sections = [];

            this.init();
        }
    }

    init() {
        super.init();
        this.appendSections();

        this.sections.forEach(section => observe(section.el, section));
    }

    appendSections() {
        if (!this.data.sections) {
            return;
        }

        const data = this.data.sections.shift();

        const heading = new HomeHeading(data);
        this.article.append(...heading.nodeList);
        this.sections.push(heading);

        const projectsData = [];

        this.data.sections.forEach(data => {
            if (data._type === 'project') {
                projectsData.push(data);
                return;
            }
        });

        const projects = new HomeProjects(projectsData);
        this.article.append(...projects.nodeList);
        this.sections.push(projects);
    }
}
