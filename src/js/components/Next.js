import { basePath } from '../utils/settings.js';
import { html } from '../utils/html.js';

export class Next {
    constructor(sectionData) {
        this.sectionData = sectionData;

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const { link, label } = this.sectionData;

        this.nodeList = html(/* html */ `
            <nav class="next">
                <ul>
                    <li><a href="${basePath}${link}">${label} <span>⟶</span></a></li>
                </ul>
            </nav>
        `);
    }
}
