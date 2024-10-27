import { Page } from './Page.js';
import { Navigation } from '../components/Navigation.js';
import { Figure } from '../components/Figure.js';
import { SectionProject } from '../components/SectionProject.js';
import { Footer } from '../components/Footer.js';

import { basePath } from '../utils/settings.js';
import { data } from '../utils/data.js';
// import { observe } from '../utils/observer.js';

export class Article extends Page {
    constructor() {
        super();

        this.slug = location.pathname.replace(new RegExp(`${basePath}/projects/(.+?)(?:.html|$)`), '$1');
        this.articles = data.get('articles');
        this.data = this.articles.find(doc => doc.slug.current === this.slug);
        this.sections = [];

        document.body.className = 'project';
        document.title = `${this.data.title} — ${data.get('title')}`;

        this.init();
    }

    init() {
        super.init();

        const navigation = new Navigation();
        this.el.prepend(navigation.el);
        this.sections.push(navigation);

        const figure = new Figure(this.data, true);
        this.article.append(figure.el);
        this.sections.push(figure);

        const section = new SectionProject(this.data);
        this.article.append(section.el);
        this.sections.push(section);

        super.appendSections();

        // Get back and next projects
        const projects = data.get('projects');
        const index = projects.findIndex(doc => doc._id === this.data._id);
        let prevIndex = index;
        let nextIndex = index;

        if (--prevIndex < 0) {
            prevIndex = projects.length - 1;
        }

        if (++nextIndex > projects.length - 1) {
            nextIndex = 0;
        }

        const footer = new Footer({
            back: projects[prevIndex],
            next: projects[nextIndex]
        });
        this.article.append(footer.el);
        this.sections.push(footer);

        // this.sections.forEach(section => observe(section.el, section));
    }
}
