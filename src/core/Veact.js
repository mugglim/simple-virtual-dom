import { isObject } from '@/util/object';
import { isTextElement, isProperty, setAttribute } from '@/util/element';
import { TEXT_ELEMENT } from '@/constants/element';

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

const createDOM = fiber => {
    const dom = isTextElement(fiber.type)
        ? document.createTextNode('')
        : document.createElement(fiber.type);

    Object.keys(fiber.props)
        .filter(isProperty)
        .forEach(prop => setAttribute(dom, prop, fiber.props[prop]));

    return dom;
};

let nextUnitOfWork = null;

const render = (element, $container) => {
    // work fiber
    nextUnitOfWork = {
        dom: $container, // div#root
        props: {
            children: [element],
        },
    };
};

// 작업 단위를 수행 후, 다음 처리 할 작업을 fiber를 결정 후 반환
const performUnitOfWork = fiber => {
    // 1. DOM 생성
    if (!fiber.dom) {
        fiber.dom = createDOM(fiber);
    }

    // 2. DOM에 생성한 엘리먼트 삽입
    if (fiber.parent) {
        fiber.parent.dom.appendChild(fiber.dom);
    }

    // 3. 자식 fiber 생성
    const elements = fiber.props.children;
    let prevSibling = null;

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null,
        };
        if (i === 0) {
            // 첫 번째 child는 작업 단위로 반영
            fiber.child = newFiber;
        } else {
            // 자식들 간 형제 관계 반영
            prevSibling.sibling = newFiber;
        }

        // 이전의 자식을 반영
        prevSibling = newFiber;
    }

    // 4. 자식이 있다면 다음 fiber로 채택
    if (fiber.child) {
        return fiber.child;
    }

    // 5. 형제가 있다면 형제를 작업 단위로 채택
    let nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        // 형제 노드가 없다면 부모 노드로 복귀
        nextFiber = nextFiber.parent;
    }

    // 자식, 형제도 없는 경우에는 더 이상 처리할 fiber가 없음
    return false;
};

const workLoop = deadline => {
    let shouldYield = false;

    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1;
    }

    requestIdleCallback(workLoop);
};
requestIdleCallback(workLoop);

export default { createElement, render };
