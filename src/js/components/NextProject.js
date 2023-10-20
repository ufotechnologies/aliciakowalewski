import { basePath } from '../utils/settings.js';
import { html } from '../utils/html.js';

export class NextProject {
    constructor(sectionData) {
        this.sectionData = sectionData;

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const { slug, title } = this.sectionData;

        this.nodeList = html(/* html */ `
            <nav class="next">
                <a href="javascript:history.back();">Back</a>
                <a href="${basePath}/projects/${slug.current}">Next</a>
            </nav>
        `);
    }
}
