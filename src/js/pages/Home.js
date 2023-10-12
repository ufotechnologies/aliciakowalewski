import { Page } from './Page.js';
import { HomeHeading } from '../components/HomeHeading.js';
import { HomeDescription } from '../components/HomeDescription.js';
import { Figure } from '../components/Figure.js';
import { Project } from '../components/Project.js';
import { Next } from '../components/Next.js';

import { data } from '../utils/data.js';

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
    }

    appendSections() {
        if (!this.data.sections) {
            return;
        }

        const data = this.data.sections.shift();

        const section = new HomeHeading(data);
        this.article.append(...section.nodeList);
        this.sections.push(section);

        this.data.sections.forEach(data => {
            if (data._type === 'section') {
                const section = new HomeDescription(data);
                this.article.append(...section.nodeList);
                this.sections.push(section);
                return;
            }

            if (data._type === 'figure') {
                const figure = new Figure(data);
                this.article.append(...figure.nodeList);
                this.sections.push(figure);
                return;
            }

            if (data._type === 'project') {
                const project = new Project(data);
                this.article.append(...project.nodeList);
                this.sections.push(project);
                return;
            }

            if (data._type === 'next') {
                const next = new Next(data);
                this.main.append(...next.nodeList);
                this.sections.push(next);
                return;
            }
        });
    }
}
