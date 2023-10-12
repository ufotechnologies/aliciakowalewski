import { Page } from './Page.js';
import { SectionProject } from '../components/SectionProject.js';
import { Figure } from '../components/Figure.js';
import { NextProject } from '../components/NextProject.js';

import { basePath } from '../utils/settings.js';
import { data } from '../utils/data.js';

export class Article extends Page {
    constructor() {
        super();

        this.el = document.querySelector('body.project');

        if (this.el) {
            this.slug = location.pathname.replace(new RegExp(`${basePath}/projects/(.+?)(?:\.html|$)`), '$1');
            this.articles = data.get('articles');
            this.data = this.articles.find(doc => doc.slug.current === this.slug);
            this.sections = [];

            this.init();
        }
    }

    init() {
        super.init();

        const section = new SectionProject(this.data);
        this.article.append(...section.nodeList);
        this.sections.push(section);

        const figure = new Figure(this.data);
        this.article.append(...figure.nodeList);
        this.sections.push(figure);

        super.appendSections();

        let index = this.articles.findIndex(doc => doc._id === this.data._id);

        if (++index > this.articles.length - 1) {
            index = 0;
        }

        const next = new NextProject(this.articles[index]);
        this.main.append(...next.nodeList);
        this.sections.push(next);
    }
}
