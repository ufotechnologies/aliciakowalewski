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
        this.articles = data.get('articles');
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

        this.sections.forEach(section => observe(section.el, section));
    }

    appendSections() {
        if (!this.data.sections) {
            return;
        }

        const sections = this.data.sections.slice();
        const data = sections.shift();

        const heading = new HomeHeading(data);
        this.article.append(heading.el);
        this.sections.push(heading);

        const projectsData = [];

        sections.forEach(data => {
            if (data._type === 'project') {
                projectsData.push(data);
                return;
            }
        });

        const projects = new HomeProjects(projectsData);
        this.article.append(projects.el);
        this.sections.push(projects);

        const prevIndex = projectsData.length - 1;
        const nextIndex = 0;

        const footer = new Footer({
            back: this.articles.find(doc => doc._id === projectsData[prevIndex]._ref),
            next: this.articles.find(doc => doc._id === projectsData[nextIndex]._ref)
        });
        this.article.append(footer.el);
        this.sections.push(footer);
    }
}
