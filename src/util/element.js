import { TEXT_ELEMENT } from '@/constants/element';

export const isTextElement = type => type === TEXT_ELEMENT;
export const isProperty = prop => prop !== 'children';
export const setAttribute = ($dom, prop, value) => {
    $dom[prop] = value;
};
