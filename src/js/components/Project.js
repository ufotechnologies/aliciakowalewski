import { Component } from './Component.js';

import { basePath } from '../utils/settings.js';
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

        const contain = thumbnailImage && thumbnailImage.contain;
        const image = (thumbnailImage || featuredImage).image;
        const asset = data.get('images').find(doc => doc._id === image.asset._ref);
        const assetWidth = 580;
        const assetHeight = 580;
        const dimensions = asset.metadata.dimensions.aspectRatio > 1 ? `h=${assetHeight}` : `w=${assetWidth}`;
        const src = `${asset.url}?${dimensions}&fit=min&auto=format`;
        const width = asset.metadata.dimensions.aspectRatio > 1 ? Math.round(assetHeight * asset.metadata.dimensions.aspectRatio) : assetWidth;
        const height = asset.metadata.dimensions.aspectRatio > 1 ? assetHeight : Math.round(assetWidth / asset.metadata.dimensions.aspectRatio);

        this.nodeList = html(/* html */ `
            <figure>
                <a href="${basePath}/projects/${slug.current}">
                    <img src="${src}" width="${width}" height="${height}" class="${contain ? 'contain' : ''}">
                </a>
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
