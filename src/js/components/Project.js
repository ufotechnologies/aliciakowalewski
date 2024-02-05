import { Component } from './Component.js';
import { assetHeight, basePath } from '../utils/settings.js';
import { data } from '../utils/data.js';
import { html } from '../utils/html.js';

export class Project extends Component {
    constructor(sectionData) {
        super();

        this.sectionData = sectionData;

        if (this.sectionData._ref) {
            this.sectionData = data.get('articles').find(doc => doc._id === this.sectionData._ref);
        }

        this.init();
    }

    init() {
        this.render();

        this.el = this.nodeList[0];
        this.links = this.el.querySelectorAll('a');

        this.enable();
    }

    render() {
        const { slug, featuredImage } = this.sectionData;

        const asset = data.get('assets').find(doc => doc._id === featuredImage.image.asset._ref);
        const src = `${asset.url}?h=${assetHeight}&fit=min&auto=format`;
        const width = assetHeight * asset.metadata.dimensions.aspectRatio;

        this.nodeList = html(/* html */ `
            <figure>
                <a href="${basePath}/projects/${slug.current}"><img src="${src}" width="${width}" height="${assetHeight}"></a>
            </figure>
        `);
    }

    addListeners() {
        this.links.forEach(el => el.addEventListener('click', this.onClick));
    }

    removeListeners() {
        this.links.forEach(el => el.removeEventListener('click', this.onClick));
    }

    // Event handlers

    onClick = e => {
        e.preventDefault();

        const path = e.currentTarget.getAttribute('href');
        this.setPath(path);
    };

    // Public methods

    enable = () => {
        this.addListeners();
    };

    disable = () => {
        this.removeListeners();
    };

    destroy = () => {
        this.disable();

        return super.destroy();
    };
}
