import { Component } from './Component.js';
import { assetSize, basePath } from '../utils/settings.js';
import { router } from '../utils/router.js';
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
        const { slug, thumbnailImage, featuredImage } = this.sectionData;

        const image = (thumbnailImage || featuredImage).image;
        const asset = data.get('assets').find(doc => doc._id === image.asset._ref);
        const dimensions = asset.metadata.dimensions.aspectRatio > 1 ? `h=${assetSize}` : `w=${assetSize}`;
        const src = `${asset.url}?${dimensions}&fit=min&auto=format`;
        const width = asset.metadata.dimensions.aspectRatio > 1 ? Math.round(assetSize * asset.metadata.dimensions.aspectRatio) : assetSize;
        const height = asset.metadata.dimensions.aspectRatio > 1 ? assetSize : Math.round(assetSize / asset.metadata.dimensions.aspectRatio);

        this.nodeList = html(/* html */ `
            <figure>
                <a href="${basePath}/projects/${slug.current}"><img src="${src}" width="${width}" height="${height}"></a>
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
        router.setPath(path);
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
