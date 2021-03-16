import cn from 'classnames';

import { Component } from '../../core/Component';
import './Button.scss';

const DEFAULT_TYPE = 'button';

export class Button extends Component {
    constructor(options = {}) {
        const { className, type = DEFAULT_TYPE, title, disabled, attrs, children } = options;

        super({
            tagName: 'button',
            className: cn('button', className),
            attrs: { type, title, disabled, ...attrs },
            children
        });
    }
}
