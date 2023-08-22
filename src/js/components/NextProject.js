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
                <ul>
                    <li>
                        <div class="eyebrow">Next project</div>
                        <a href="${basePath}/projects/${slug.current}">${title} <span>⟶</span></a>
                    </li>
                </ul>
            </nav>
        `);
    }
}
