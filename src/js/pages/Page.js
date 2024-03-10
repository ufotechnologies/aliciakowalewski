import { Component } from '../components/Component.js';
import { Section } from '../components/Section.js';
import { Figure } from '../components/Figure.js';
import { Diptych } from '../components/Diptych.js';
import { Project } from '../components/Project.js';
import { Smooth } from '../components/Smooth.js';
import { html } from '../utils/html.js';

export class Page extends Component {
    init() {
        this.render();

        this.el = this.nodeList[0];
        this.article = this.el.querySelector('article');

        this.smooth = new Smooth({
            root: document.querySelector('.page'),
            container: this.article,
            lerpSpeed: 0.075
        });
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

            if (data._type === 'diptych') {
                const diptych = new Diptych(data);
                this.article.append(diptych.el);
                this.sections.push(diptych);
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

    render() {
        this.nodeList = html(/* html */ `
            <main>
                <article></article>
            </main>
        `);
    }

    // Event handlers

    // Public methods

    animateIn = () => {
    };

    animateOut = () => {
        this.disable();
    };

    setScroll = top => {
        this.smooth.setScroll(top);
    };

    enable = () => {
    };

    disable = () => {
        this.smooth.disable();

        for (let i = 0, l = this.sections.length; i < l; i++) {
            if (this.sections[i] && this.sections[i].destroy) {
                this.sections[i].disable();
            }
        }
    };

    destroy() {
        this.smooth.destroy();

        for (let i = this.sections.length - 1; i >= 0; i--) {
            if (this.sections[i] && this.sections[i].destroy) {
                this.sections[i].destroy();
            }
        }

        return super.destroy();
    }
}
