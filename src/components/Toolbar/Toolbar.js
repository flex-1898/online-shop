import cn from 'classnames';

import { Component } from '../../core/Component';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import './Toolbar.scss';

export class Toolbar extends Component {
    constructor(options = {}) {
        const { gs, categories } = options;
        const { activeCategory } = gs.state;

        const buttons = categories
            .map(category => {
                const isActive = category === activeCategory;

                const button = new Button({
                    className: cn('button--secondary toolbar__button', {
                        'toolbar__button--active': isActive
                    }),
                    title: `Switch to "${category}"`,
                    disabled: isActive,
                    attrs: {
                        'data-category': category
                    },
                    children: category
                });

                return button.toHTML();
            })
            .join('');

        const input = new Input({
            className: 'toolbar__input',
            name: 'search',
            placeholder: 'Search'
        });

        super({
            className: 'toolbar',
            children: `
                <div class="width-limiter toolbar__wrapper">
                    <div class="toolbar__categories">${buttons}</div>
                    <div class="toolbar__search">${input.toHTML()}</div>
                </div>
            `
        });

        this.setState = gs.setState.bind(gs);

        this.addEventListeners({
            click: this.handleSwitchCategory.bind(this)
        });
    }

    handleSwitchCategory(e) {
        const button = e.target;

        if (button.tagName !== 'BUTTON') return;

        const activeButton = document.querySelector('.toolbar__button--active');

        activeButton.classList.remove('toolbar__button--active');
        activeButton.removeAttribute('disabled');

        button.classList.add('toolbar__button--active');
        button.setAttribute('disabled', true);

        const { category: activeCategory } = button.dataset;

        this.setState({ activeCategory, activePage: 1 });
    }
}
