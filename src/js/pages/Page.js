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

        this.el = this.nodeList[0];

        const navigation = new Navigation();
        this.el.append(navigation.el);
        this.sections.push(navigation);

        this.smooth = new Smooth({
            root: document.querySelector('main'),
            container: this.el,
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
                this.el.append(section.el);
                this.sections.push(section);
                return;
            }

            if (data._type === 'figure') {
                const figure = new Figure(data);
                this.el.append(figure.el);
                this.sections.push(figure);
                return;
            }

            if (data._type === 'diptych') {
                const diptych = new Diptych(data);
                this.el.append(diptych.el);
                this.sections.push(diptych);
                return;
            }

            if (data._type === 'project') {
                const project = new Project(data);
                this.el.append(project.el);
                this.sections.push(project);
                return;
            }
        });
    }

    render() {
        this.nodeList = html(/* html */ `
            <article></article>
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
        this.smooth.enable();
    };

    disable = () => {
        this.smooth.disable();
    };

    destroy() {
        this.smooth.destroy();

        for (const prop in this) {
            this[prop] = null;
        }

        return null;
    }
}
