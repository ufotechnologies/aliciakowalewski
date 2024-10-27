export class Router {
    constructor() {
        this.routes = new Map();

        this.path = null;
        this.page = null;
        this.transition = null;

        this.firstPage = true;
        this.nextPage = null;
        this.isTransitioning = false;
    }

    replacePage({ object, data }) {
        if ('prototype' in object) {
            if (history.scrollRestoration === 'manual') {
                window.scrollTo(0, 0);
            }

            const page = new object(data);

            if (this.page) {
                if (this.page.parent && this.page.parent.replace) {
                    this.page.parent.replace(this.page, page);
                } else if (this.page.el && this.page.el.parentNode) {
                    if (page.el) {
                        this.page.el.parentNode.replaceChild(page.el, this.page.el);
                    } else if (page.nodeName) {
                        this.page.el.parentNode.replaceChild(page, this.page.el);
                    }
                } else if (this.page.nodeName && this.page.parentNode) {
                    if (page.el) {
                        this.page.parentNode.replaceChild(page.el, this.page);
                    } else if (page.nodeName) {
                        this.page.parentNode.replaceChild(page, this.page);
                    }
                }

                if (this.page.destroy) {
                    this.page.destroy();
                }
            }

            this.page = page;

            if (this.page.animateIn) {
                this.page.animateIn();
            }

            if (this.transition) {
                this.transition.animateOut(() => {
                    this.isTransitioning = false;
                });
            } else {
                this.isTransitioning = false;
            }
        } else {
            object(data);
        }
    }

    transitionPage() {
        if (!this.firstPage && this.transition) {
            if (this.page.animateOut) {
                this.page.animateOut();
            }

            this.transition.animateIn(() => {
                this.replacePage(this.nextPage);
            });
        } else {
            if (this.firstPage) {
                this.firstPage = false;
            }

            this.replacePage(this.nextPage);
        }
    }

    addListeners() {
        window.addEventListener('popstate', this.onPopState);
    }

    // Event handlers

    onPopState = () => {
        const value = this.get(location.pathname);

        if (value) {
            this.nextPage = value;

            if (!this.isTransitioning) {
                this.isTransitioning = true;

                this.transitionPage();
            }
        }
    };

    // Public methods

    init({
        path = '',
        page,
        transition,
        scrollRestoration = 'manual'
    } = {}) {
        this.path = path;
        this.page = page;
        this.transition = transition;

        history.scrollRestoration = scrollRestoration;

        this.addListeners();
        this.onPopState();
    }

    add(path, object, data) {
        this.routes.set(path, { object, data });
    }

    get(path) {
        let value = this.routes.get(`/${path.replace(this.path, '').split('/')[1]}`);

        if (!value) {
            value = this.routes.get('404');
        }

        return value;
    }

    getPath(path) {
        return this.path + path;
    }

    setPath(path) {
        if (path === location.pathname) {
            return;
        }

        history.pushState(null, null, path);

        const event = new PopStateEvent('popstate');
        window.dispatchEvent(event);
    }
}

export const router = new Router();
