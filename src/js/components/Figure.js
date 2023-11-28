import gsap from 'gsap';

import { assetHeight } from '../utils/settings.js';
import { data } from '../utils/data.js';
import { html } from '../utils/html.js';

export class Figure {
    constructor(sectionData, parallax) {
        this.sectionData = sectionData;
        this.parallax = parallax;

        this.init();
    }

    init() {
        this.render();

        this.el = this.nodeList[0];

        gsap.set(this.el, { y: 10, opacity: 0 });

        if (this.parallax && !navigator.maxTouchPoints) {
            this.parallax = this.el.querySelector('img, video');
            this.movement = Math.round(window.innerHeight * 0.2);
            this.lerpSpeed = 0.075;

            this.top = 0;
            this.bottom = 0;
            this.position = 0;
            this.target = 0;
            this.last = 0;
            this.delta = 0;
            this.direction = 0;
            this.isVisible = false;

            gsap.set(this.parallax, {
                width: `calc(100% + ${this.movement}px)`,
                height: `calc(100% + ${this.movement}px)`,
                bottom: 0,
                left: -this.movement / 2
            });

            this.addListeners();
            this.onResize();
        }
    }

    render() {
        const { indent, image, featuredImage, label, caption, mp4 } = this.sectionData;

        if (mp4) {
            this.nodeList = html(/* html */ `
                <figure class="${indent ? 'indent ' : ''}scroll-lazy${this.parallax ? ' parallax' : ''}">
                    <video autoplay muted loop playsinline src="${mp4}"></video>
                    <figcaption>
                        ${label ? /* html */ `<div><strong>${label}</strong></div>` : ''}
                        ${caption ? /* html */ `<div>${caption}</div>` : ''}
                    </figcaption>
                </figure>
            `);
        } else if (image) {
            const asset = data.get('assets').find(doc => doc._id === image.asset._ref);
            const src = `${asset.url}?h=${assetHeight}&fit=min&auto=format`;
            const width = Math.round(assetHeight * asset.metadata.dimensions.aspectRatio);

            this.nodeList = html(/* html */ `
                <figure class="${indent ? 'indent ' : ''}scroll-lazy${this.parallax ? ' parallax' : ''}">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 0 0'%3E%3C/svg%3E" data-src="${src}" width="${width}" height="${assetHeight}">
                    <figcaption>
                        ${label ? /* html */ `<div><strong>${label}</strong></div>` : ''}
                        ${caption ? /* html */ `<div>${caption}</div>` : ''}
                    </figcaption>
                </figure>
            `);
        } else if (featuredImage) {
            const asset = data.get('assets').find(doc => doc._id === featuredImage.image.asset._ref);
            const src = `${asset.url}?h=${assetHeight}&fit=min&auto=format`;
            const width = Math.round(assetHeight * asset.metadata.dimensions.aspectRatio);

            this.nodeList = html(/* html */ `
                <figure class="scroll-lazy${this.parallax ? ' parallax' : ''}">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 0 0'%3E%3C/svg%3E" data-src="${src}" width="${width}" height="${assetHeight}">
                    <figcaption>
                        ${featuredImage.label ? /* html */ `<div><strong>${featuredImage.label}</strong></div>` : ''}
                        ${featuredImage.caption ? /* html */ `<div>${featuredImage.caption}</div>` : ''}
                    </figcaption>
                </figure>
            `);
        } else {
            this.nodeList = html(/* html */ `
                <figure class="scroll-lazy${this.parallax ? ' parallax' : ''}">
                </figure>
            `);
        }
    }

    addListeners() {
        window.addEventListener('resize', this.onResize);
        gsap.ticker.add(this.onUpdate);
    }

    // Event handlers

    onResize = () => {
        // defer
        gsap.delayedCall(0, () => {
            this.top = Math.max(this.el.offsetTop - window.innerHeight, 0); // clamp to 0
            this.bottom = this.el.clientHeight + window.innerHeight;
        });
    };

    onUpdate = () => {
        if (
            document.scrollingElement.scrollTop >= this.top &&
            document.scrollingElement.scrollTop <= this.top + this.bottom
        ) {
            this.target = gsap.utils.mapRange(
                0,
                1,
                0,
                -1,
                (document.scrollingElement.scrollTop - this.top) / this.bottom
            );

            if (!this.isVisible) {
                this.position = this.target;
            } else {
                this.position = gsap.utils.interpolate(
                    this.position,
                    this.target,
                    this.lerpSpeed
                );
            }

            this.delta = this.position - this.last;
            this.last = this.position;
            this.direction = Math.sign(this.delta);

            this.isVisible = true;

            gsap.set(this.parallax, { y: -this.movement * this.position });
        } else {
            this.isVisible = false;
        }
    };

    // Public methods

    animateIn = () => {
        gsap.to(this.el, { y: 0, opacity: 1, duration: 1 });
    };
}
