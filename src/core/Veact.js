const TEXT_ELEMENT = 'TEXT_ELEMENT';

const isTextElement = element => element.type === TEXT_ELEMENT;
const isObject = element => typeof element === 'object';
const isProperty = prop => prop !== 'children';
const setValue = ($dom, prop, value) => ($dom[prop] = value);
const mapChildElement = element => (isObject(element) ? element : createTextElement(element));

function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(mapChildElement),
        },
    };
}

function createTextElement(text) {
    return {
        type: TEXT_ELEMENT,
        props: {
            nodeValue: text,
            children: [],
        },
    };
}

function render(element, $container) {
    const $dom = isTextElement(element)
        ? document.createTextNode('')
        : document.createElement(element.type);

    Object.keys(element.props)
        .filter(isProperty)
        .forEach(prop => setValue($dom, prop, element.props[prop]));

    element.props.children.forEach(child => render(child, $dom));
    $container.appendChild($dom);
}

export default { createElement, createTextElement, render };
