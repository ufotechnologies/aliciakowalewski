export class Component {
    init() {
    }

    render() {
    }

    update() {
    }

    setPath(path) {
        if (path === location.pathname) {
            return;
        }

        history.pushState(null, null, path);

        const event = new PopStateEvent('popstate');
        window.dispatchEvent(event);
    }

    addListeners() {
    }

    removeListeners() {
    }

    // Event handlers

    // Public methods

    animateIn = () => {
    };

    animateOut = () => {
    };

    enable = () => {
    };

    disable = () => {
    };

    destroy() {
        for (const prop in this) {
            this[prop] = null;
        }

        return null;
    }
}
