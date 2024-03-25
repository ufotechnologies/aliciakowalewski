import gsap from 'gsap';
import { Vector2 } from '@alienkitty/space.js';

import { Component } from './Component.js';
import { html } from '../utils/html.js';

export class Transition extends Component {
    constructor() {
        super();

        this.el = document.querySelector('.transition');

        this.init();
    }

    init() {
        this.render();

        this.el.append(...this.nodeList);

        this.canvas = this.el.querySelector('canvas');
        this.context = this.canvas.getContext('2d');

        this.first = true;
        this.progress = 0;
        this.bend = 0;
        this.animatedIn = false;
        this.needsUpdate = false;

        // Fill
        this.fill = {};
        this.fill.fillStyle = getComputedStyle(document.querySelector(':root')).getPropertyValue('--bg-color');

        // Points
        this.points = [];

        for (let i = 0; i < 3; i++) {
            this.points.push(new Vector2());
        }

        this.addListeners();
        this.onResize();
    }

    render() {
        this.nodeList = html(/* html */ `
            <canvas></canvas>
        `);
    }

    update() {
        this.context.fillStyle = this.fill.fillStyle;

        // Spline
        this.context.beginPath();
        this.context.moveTo(this.points[0].x, this.points[0].y);
        this.context.quadraticCurveTo(this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y);

        // Fill
        if (this.animatedIn) {
            this.context.lineTo(this.width, 0);
            this.context.lineTo(0, 0);
        } else {
            this.context.lineTo(this.width, this.start);
            this.context.lineTo(0, this.start);
        }

        this.context.lineTo(this.points[0].x, this.points[0].y);
        this.context.fill();
    }

    addListeners() {
        window.addEventListener('resize', this.onResize);
        gsap.ticker.add(this.onUpdate);
    }

    // Event handlers

    onResize = () => {
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;
        const dpr = window.devicePixelRatio;

        this.width = width;
        this.height = height;

        this.start = height;
        this.end = 0;
        this.direction = this.end - this.start < 0 ? -1 : 1;

        this.canvas.width = Math.round(this.width * dpr);
        this.canvas.height = Math.round(this.height * dpr);
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        this.context.scale(dpr, dpr);

        const increment = width / (this.points.length - 1);

        for (let i = 0, l = this.points.length; i < l; i++) {
            this.points[i].x = increment * i;
            this.points[i].y = this.start;
        }
    };

    onUpdate = () => {
        if (this.needsUpdate) {
            for (let i = 0, l = this.points.length; i < l; i++) {
                const difference = Math.abs(this.width / 2 - this.points[i].x) / this.width;
                const offset = (this.bend - (difference * (this.height / 2)) * this.bend) * this.direction;
                this.points[i].y = this.start + offset + this.height * this.progress * this.direction;
            }

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.update();
        }
    };

    // Public methods

    animateIn = callback => {
        if (this.first) {
            if (callback) {
                callback();
            }
        } else {
            gsap.killTweensOf(this);

            this.progress = 0;
            this.bend = 0;
            this.animatedIn = false;
            this.needsUpdate = true;

            gsap.to(this, { progress: 1, duration: 1.25, ease: 'power3.inOut', onComplete: () => {
                this.needsUpdate = false;

                if (callback) {
                    callback();
                }
            } });

            gsap.to(this, { bend: 1, duration: 0.5, ease: 'linear', onComplete: () => {
                gsap.to(this, { bend: 0, duration: 0.5, ease: 'linear' });
            } });
        }
    };

    animateOut = callback => {
        if (this.first) {
            this.first = false;

            if (callback) {
                callback();
            }
        } else {
            gsap.killTweensOf(this);

            this.progress = 0;
            this.bend = 0;
            this.animatedIn = true;
            this.needsUpdate = true;

            gsap.to(this, { progress: 1, duration: 1.25, ease: 'power3.inOut', onComplete: () => {
                this.needsUpdate = false;
                this.animatedIn = false;

                if (callback) {
                    callback();
                }
            } });

            gsap.to(this, { bend: 1, duration: 0.5, ease: 'linear', onComplete: () => {
                gsap.to(this, { bend: 0, duration: 0.5, ease: 'linear' });
            } });
        }
    };
}
