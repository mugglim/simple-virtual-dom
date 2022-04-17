import { isObject } from '@/util/object';
import { isTextElement, isProperty, setAttribute } from '@/util/element';
import { TEXT_ELEMENT } from '@/constants/element';

// element type이 원시값인 경우, text node로 반환
const mapChildElement = element => {
    return isObject(element) ? element : createTextElement(element);
};

const createElement = (type, props, ...children) => {
    return {
        type,
        props: {
            ...props,
            children: children.map(mapChildElement),
        },
    };
};

const createTextElement = text => {
    return {
        type: TEXT_ELEMENT,
        props: {
            nodeValue: text,
            children: [],
        },
    };
};

const render = (element, $container) => {
    const $dom = isTextElement(element)
        ? document.createTextNode('')
        : document.createElement(element.type);

    Object.keys(element.props)
        .filter(isProperty)
        .forEach(prop => setAttribute($dom, prop, element.props[prop]));

    element.props.children.forEach(child => render(child, $dom));
    $container.appendChild($dom);
};

export default { createElement, createTextElement, render };
