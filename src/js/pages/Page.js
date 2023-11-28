import { Default } from '../layouts/Default.js';
import { Navigation } from '../components/Navigation.js';
import { Section } from '../components/Section.js';
import { Figure } from '../components/Figure.js';
import { Diptych } from '../components/Diptych.js';
import { Project } from '../components/Project.js';
import { Smooth } from '../components/Smooth.js';

import { html } from '../utils/html.js';

export class Page {
    init() {
        this.render();

        this.el.append(...this.layoutNodeList);

        this.navigation = new Navigation();

        this.main = this.el.querySelector('main');
        this.article = this.el.querySelector('article');

        this.smooth = new Smooth({
            root: this.main,
            container: this.article,
            // lerpSpeed: 0.075
        });
    }

    appendSections() {
        if (!this.data.sections) {
            return;
        }

        this.data.sections.forEach(data => {
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

            if (data._type === 'diptych') {
                const diptych = new Diptych(data);
                this.article.append(...diptych.nodeList);
                this.sections.push(diptych);
                return;
            }

            if (data._type === 'project') {
                const project = new Project(data);
                this.article.append(...project.nodeList);
                this.sections.push(project);
                return;
            }
        });
    }

    render() {
        this.layoutNodeList = html(Default);
    }
}
