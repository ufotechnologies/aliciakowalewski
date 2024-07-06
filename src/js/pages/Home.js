import { Page } from './Page.js';
import { Navigation } from '../components/Navigation.js';
import { HomeHeading } from '../components/HomeHeading.js';
import { HomeProjects } from '../components/HomeProjects.js';
import { Footer } from '../components/Footer.js';
import { data } from '../utils/data.js';
import { observe } from '../utils/observer.js';

export class Home extends Page {
    constructor() {
        super();

        this.data = data.get('home');
        this.sections = [];

        document.body.className = 'home';
        document.title = data.get('title');

        this.init();
    }

    init() {
        super.init();

        const navigation = new Navigation();
        this.article.prepend(navigation.el);
        this.sections.push(navigation);

        this.appendSections();

        // Get back and next projects
        const projects = data.get('projects');

        const footer = new Footer({
            back: projects[projects.length - 1],
            next: projects[0]
        });
        this.article.append(footer.el);
        this.sections.push(footer);

        this.sections.forEach(section => observe(section.el, section));
    }

    appendSections() {
        if (!this.data.sections) {
            return;
        }

        const heading = new HomeHeading(this.data.sections[0]);
        this.article.append(heading.el);
        this.sections.push(heading);

        const projects = new HomeProjects();
        this.article.append(projects.el);
        this.sections.push(projects);
    }
}
