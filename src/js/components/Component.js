export class Component {
    init() {
    }

    render() {
    }

    update() {
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
