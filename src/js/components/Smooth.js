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
            gsap.set(this.root, {
                position: 'fixed',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden'
            });

            gsap.set(this.container, { willChange: 'transform' });
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

            gsap.set(document.body, { height });

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

        if (!navigator.maxTouchPoints) {
            gsap.set(this.container, { y: -this.position });
        }

        gsap.utils.clamp(0, 1, this.position / (this.height - document.documentElement.clientHeight));
    };
}
