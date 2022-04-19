import Veact from './core/Veact';
import { $ } from './util/selector';

/** @jsx Veact.createElement */
const element = (
    <div>
        <h1>
            <p>Hello</p>
            <a>World</a>
        </h1>
        <h2 />
    </div>
);

const $container = $('#root');
Veact.render(element, $container);
