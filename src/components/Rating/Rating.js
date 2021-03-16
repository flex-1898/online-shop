import { Component } from '../../core/Component';
import './Rating.scss';

const MAX_VALUE = 5;
const DEFAULT_EMPTY_ICON_CLASSNAME = 'far fa-star';
const DEFAULT_FILLED_ICON_CLASSNAME = 'fas fa-star';

export class Rating extends Component {
    constructor(options = {}) {
        const {
            emptyIconClassName = DEFAULT_EMPTY_ICON_CLASSNAME,
            filledIconClassName = DEFAULT_FILLED_ICON_CLASSNAME,
            value
        } = options;

        const icons = [];

        for (let i = 0; i < MAX_VALUE; i++) {
            const iconClassName = i < value ? filledIconClassName : emptyIconClassName;
            const icon = `<i class="${iconClassName}"></i>`;

            icons.push(icon);
        }

        super({
            className: 'rating',
            children: icons.join('')
        });
    }
}
