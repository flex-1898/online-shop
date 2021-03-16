import cn from 'classnames';

import { Component } from '../../core/Component';
import './Input.scss';

const DEFAULT_TYPE = 'text';
const DEFAULT_AUTOCOMPLETE = 'off';

export class Input extends Component {
    constructor(options = {}) {
        const {
            className,
            type = DEFAULT_TYPE,
            autocomplete = DEFAULT_AUTOCOMPLETE,
            ...other
        } = options;

        super({
            tagName: 'input',
            className: cn('input', className),
            attrs: { type, autocomplete, ...other }
        });
    }
}
