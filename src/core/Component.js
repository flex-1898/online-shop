export class Component {
    constructor(options = {}) {
        const { tagName = 'div', className, attrs, children } = options;

        this._component = document.createElement(tagName);

        if (className) this._component.className = className;

        // Attributes
        for (const attrName in attrs) {
            const attrValue = attrs[attrName];
            const isInvalidValue = [undefined, null, false].includes(attrValue);

            if (isInvalidValue) continue;

            this._component.setAttribute(attrName, attrValue);
        }

        if (children) {
            this.children(children);
        }
    }

    addEventListeners(listeners) {
        for (const eventName in listeners) {
            const listener = listeners[eventName];

            this._component.addEventListener(eventName, listener);
        }
    }

    clean() {
        this._component.innerHTML = '';

        return this;
    }

    children(elements) {
        const components = Array.isArray(elements) ? elements : [elements];

        for (const component of components) {
            const isHTML = ['string', 'number'].includes(typeof component);

            if (isHTML) {
                this._component.insertAdjacentHTML('beforeend', component);
                continue;
            }

            const node = component.toNode();

            this._component.append(node);
        }
    }

    toHTML() {
        return this._component.outerHTML;
    }

    toNode() {
        return this._component;
    }
}
