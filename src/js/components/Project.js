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
        const { slug, featuredImage, title } = this.sectionData;

        const image = data.get('assets').find(doc => doc._id === featuredImage.image.asset._ref).url;
        const mobileImage = `${image}?h=600&fit=crop&crop=center&sharp=25&auto=format`;
        const desktopImage = `${image}?h=1568&fit=min&auto=format`;

        this.nodeList = html(/* html */ `
            <figure>
                <a href="${basePath}/projects/${slug.current}"><img srcset="${mobileImage} 750w, ${desktopImage} 1000w" sizes="(orientation: portrait) 750px, 100vw" src="${desktopImage}"></a>
                <figcaption>
                    <div>
                        <a href="${basePath}/projects/${slug.current}"><strong>${title}</strong></a>
                    </div>
                </figcaption>
            </figure>
        `);
    }
}
