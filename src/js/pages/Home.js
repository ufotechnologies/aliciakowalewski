import { Page } from './Page.js';
import { HomeHeading } from '../components/HomeHeading.js';
import { HomeProjects } from '../components/HomeProjects.js';
import { HomeFooter } from '../components/HomeFooter.js';
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
        this.el.append(heading.el);
        this.sections.push(heading);

        const projectsData = [];

        sections.forEach(data => {
            if (data._type === 'project') {
                projectsData.push(data);
                return;
            }
        });

        const projects = new HomeProjects(projectsData);
        this.el.append(projects.el);
        this.sections.push(projects);

        const footer = new HomeFooter();
        this.el.append(footer.el);
        this.sections.push(footer);
    }
}
