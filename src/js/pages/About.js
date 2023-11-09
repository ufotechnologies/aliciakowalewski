import { Page } from './Page.js';
import { Section } from '../components/Section.js';
import { Figure } from '../components/Figure.js';
import { Project } from '../components/Project.js';

import { data } from '../utils/data.js';
import { observe } from '../utils/observer.js';

export class About extends Page {
    constructor() {
        super();

        this.el = document.querySelector('body.about');

        if (this.el) {
            this.data = data.get('about');
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

        this.data.sections.forEach((data) => {
            if (data._type === 'section') {
                const section = new Section(data);
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
