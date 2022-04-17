import Veact from './core/Veact';
import { $ } from './util/selector';

/** @jsx Veact.createElement */
const element = (
    <div id="foo">
        <h1 class="sub-title">bar</h1>
        <h2>hello</h2>
    </div>
);

const $container = $('#root');
Veact.render(element, $container);
