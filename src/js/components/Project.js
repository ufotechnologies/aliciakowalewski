import { basePath } from '../utils/settings.js';
import { data } from '../utils/data.js';
import { html } from '../utils/html.js';

export class Project {
    constructor(sectionData) {
        this.sectionData = sectionData;

        if (this.sectionData._ref) {
            this.sectionData = data.get('articles').find(doc => doc._id === this.sectionData._ref);
        }

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const { slug, featuredImage } = this.sectionData;

        const url = data.get('assets').find(doc => doc._id === featuredImage.image.asset._ref).url;
        const src = `${url}?h=1568&fit=min&auto=format`;

        this.nodeList = html(/* html */ `
            <figure>
                <a href="${basePath}/projects/${slug.current}"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 0 0'%3E%3C/svg%3E" data-src="${src}"></a>
            </figure>
        `);
    }
}
