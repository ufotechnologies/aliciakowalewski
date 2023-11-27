import gsap from 'gsap';

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

        if (this.parallax) {
            this.parallax = this.el.querySelector('img, video');
            this.isVisible = false;
            this.topPosition = 0;
            this.totalDisplacement = 0;
            this.currentParallax = 0;
            this.targetParallax = 0;

            const p = Math.round(0.2 * window.innerHeight);
            Object.assign(this.parallax.style, {
                width: `calc(100% + ${p}px)`,
                height: `calc(100% + ${p}px)`,
                bottom: 0,
                left: `${-p * 0.5}px`
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
            const src = `${asset.url}?h=1568&fit=min&auto=format`;
            const width = asset.metadata.dimensions.width;
            const height = asset.metadata.dimensions.height;

            this.nodeList = html(/* html */ `
                <figure class="${indent ? 'indent ' : ''}scroll-lazy${this.parallax ? ' parallax' : ''}">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 0 0'%3E%3C/svg%3E" data-src="${src}" width="${width}" height="${height}">
                    <figcaption>
                        ${label ? /* html */ `<div><strong>${label}</strong></div>` : ''}
                        ${caption ? /* html */ `<div>${caption}</div>` : ''}
                    </figcaption>
                </figure>
            `);
        } else if (featuredImage) {
            const asset = data.get('assets').find(doc => doc._id === featuredImage.image.asset._ref);
            const src = `${asset.url}?h=1568&fit=min&auto=format`;
            const width = asset.metadata.dimensions.width;
            const height = asset.metadata.dimensions.height;

            this.nodeList = html(/* html */ `
                <figure class="scroll-lazy${this.parallax ? ' parallax' : ''}">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 0 0'%3E%3C/svg%3E" data-src="${src}" width="${width}" height="${height}">
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
            this.topPosition = this.el.offsetTop - window.innerHeight;
            this.topPosition = Math.max(this.topPosition, 0); // clamp to 0
            this.totalDisplacement = this.el.clientHeight + window.innerHeight;
        });
    };

    onUpdate = () => {
        if (
            document.scrollingElement.scrollTop >= this.topPosition &&
            document.scrollingElement.scrollTop <= this.topPosition + this.totalDisplacement
        ) {
            this.targetParallax = gsap.utils.mapRange(
                0,
                1,
                0,
                -1,
                (document.scrollingElement.scrollTop - this.topPosition) / this.totalDisplacement
            );
            // this.targetParallax = Math.min(Math.max(this.targetParallax, 0), -1); // clamp

            if (!this.isVisible) {
                this.currentParallax = this.targetParallax;
            } else {
                this.currentParallax = gsap.utils.interpolate(
                    this.currentParallax,
                    this.targetParallax,
                    0.075
                );
            }

            // this.parallax.style.transform = `translateY(${-Math.round(0.2 * window.innerHeight * this.currentParallax)}px)`;
            this.parallax.style.transform = `translateY(${-0.2 * window.innerHeight * this.currentParallax}px)`;
            // this.parallax.style.transform = `translateY(${-Math.round(0.2 * window.innerHeight * this.currentParallax * 100) / 100}px)`;

            this.isVisible = true;
        } else {
            this.isVisible = false;
        }
    };

    // Public methods

    animateIn = () => {
        this.el.classList.add('is-loaded');
    };
}
