import gsap from 'gsap';

export class Smooth {
    constructor({
        root,
        container,
        lerpSpeed = 0.1
    } = {}) {
        this.root = root;
        this.container = container;
        this.lerpSpeed = lerpSpeed;

        this.position = 0;
        this.last = 0;
        this.delta = 0;
        this.direction = 0;
        this.progress = 0;
        this.height = 0;

        this.init();
    }

    init() {
        if (!navigator.maxTouchPoints) {
            Object.assign(this.root.style, {
                position: 'fixed',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden'
            });

            this.container.style.willChange = 'transform';
        }

        this.addListeners();
        this.onResize();
    }

    addListeners() {
        window.addEventListener('resize', this.onResize);
        gsap.ticker.add(this.onUpdate);
    }

    onResize = () => {
        // defer
        gsap.delayedCall(0, () => {
            const { height } = this.container.getBoundingClientRect();

            document.body.style.height = `${height}px`;

            this.height = height;
            this.position = document.scrollingElement.scrollTop;
        });
    };

    onUpdate = () => {
        if (!navigator.maxTouchPoints) {
            this.position = gsap.utils.interpolate(
                this.position,
                document.scrollingElement.scrollTop,
                this.lerpSpeed
            );
        } else {
            this.position = document.scrollingElement.scrollTop;
        }

        this.delta = this.position - this.last;
        this.last = this.position;
        this.direction = Math.sign(this.delta);

        if (Math.abs(this.delta) < 0.001) {
            return;
        }

        if (!navigator.maxTouchPoints) {
            // this.container.style.transform = `translateY(${-Math.round(this.position)}px)`;
            this.container.style.transform = `translateY(${-this.position}px)`;
            // this.container.style.transform = `translateY(${-Math.round(this.position * 100) / 100}px)`;
        }

        gsap.utils.clamp(0, 1, this.position / (this.height - document.documentElement.clientHeight));
    };
}
