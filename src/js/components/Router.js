export class Router {
    constructor() {
        this.routes = new Map();

        this.path = null;
        this.page = null;
        this.transition = null;

        this.lastPage = null;
        this.nextPage = null;
        this.isTransitioning = false;

        history.scrollRestoration = 'manual';
    }

    replacePage({ object, data }) {
        window.scrollTo(0, 0);

        const page = new object(data);
        this.page.parentNode.replaceChild(page.el, this.page);
        this.page = page.el;

        if (this.lastPage && this.lastPage.destroy) {
            this.lastPage.destroy();
        }

        this.lastPage = page;

        if (page.animateIn) {
            page.animateIn();
        }

        this.transition.animateOut(() => {
            this.isTransitioning = false;
        });
    }

    transitionPage() {
        if (this.lastPage) {
            if (this.lastPage.animateOut) {
                this.lastPage.animateOut();
            }

            this.transition.animateIn(() => {
                this.replacePage(this.nextPage);
            });
        } else {
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
        transition
    }) {
        this.path = path;
        this.page = page;
        this.transition = transition;

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
