export const render = (elements, parentNode) => {
    const components = Array.isArray(elements) ? elements : [elements];

    const nodes = components.map(c => c.toNode());

    parentNode.append(...nodes);
};
