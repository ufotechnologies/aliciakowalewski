import { Page } from './Page.js';
import { Navigation } from '../components/Navigation.js';
import { Section } from '../components/Section.js';
import { Figure } from '../components/Figure.js';
import { Project } from '../components/Project.js';

import { data } from '../utils/data.js';
// import { observe } from '../utils/observer.js';

export class About extends Page {
    constructor() {
        super();

        this.data = data.get('about');
        this.sections = [];

        document.body.className = 'about';
        document.title = `${this.data.title} — ${data.get('title')}`;

        this.init();
    }

    init() {
        super.init();

        const navigation = new Navigation();
        this.el.prepend(navigation.el);
        this.sections.push(navigation);

        this.appendSections();

        // this.sections.forEach(section => observe(section.el, section));
    }

    appendSections() {
        if (!this.data.sections) {
            return;
        }

        this.data.sections.forEach(data => {
            if (data._type === 'section') {
                const section = new Section(data);
                this.article.append(section.el);
                this.sections.push(section);
                return;
            }

            if (data._type === 'figure') {
                const figure = new Figure(data);
                this.article.append(figure.el);
                this.sections.push(figure);
                return;
            }

            if (data._type === 'project') {
                const project = new Project(data);
                this.article.append(project.el);
                this.sections.push(project);
                return;
            }
        });
    }
}
