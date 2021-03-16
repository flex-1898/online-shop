import cn from 'classnames';

import { Component } from '../../core/Component';
import { Button } from '../Button/Button';
import './Pagination.scss';

const PRODUCTS_PER_PAGE = 9;

export class Pagination extends Component {
    constructor(options = {}) {
        const { gs, products, className, buttonClassName } = options;
        const { activePage, activeCategory } = gs.state;

        super({ className: cn('pagination', className) });

        this.products = products;
        this.buttonClassName = buttonClassName;
        this.setState = gs.setState.bind(gs);
        gs.subscribe(this);

        const buttons = this._getButtons({ products, activeCategory, activePage, buttonClassName });

        this._hidePagination(buttons.length);
        this.children(buttons);

        this.addEventListeners({
            click: this.handleSwitchPage.bind(this)
        });
    }

    _hidePagination(buttonsCount) {
        const MINIMUM_BUTTONS_COUNT = 1;

        const method = buttonsCount > MINIMUM_BUTTONS_COUNT ? 'remove' : 'add';

        this._component.classList[method]('pagination--hidden');
    }

    _getButtons({ products, activeCategory, activePage, buttonClassName }) {
        const totalCount = products.filter(p => p.category === activeCategory).length;

        const pagesCount = Math.ceil(totalCount / PRODUCTS_PER_PAGE);
        const buttons = [];

        for (let i = 0; i < pagesCount; i++) {
            const pageNumber = i + 1;
            const isActive = pageNumber === activePage;

            const button = new Button({
                className: cn('button--secondary pagination__button', buttonClassName, {
                    'pagination__button--active': isActive
                }),
                title: `Page #${pageNumber}`,
                disabled: isActive,
                attrs: {
                    'data-page': pageNumber
                },
                children: pageNumber
            });

            buttons.push(button);
        }

        return buttons;
    }

    _render(prevState, currentState) {
        const isSameCategory = prevState.activeCategory === currentState.activeCategory;

        if (isSameCategory) return;

        const { activeCategory, activePage } = currentState;
        const { products, buttonClassName } = this;

        const buttons = this._getButtons({ products, activeCategory, activePage, buttonClassName });

        this._hidePagination(buttons.length);
        this.clean().children(buttons);
    }

    handleSwitchPage(e) {
        const button = e.target;

        if (button.tagName !== 'BUTTON') return;

        const activeButton = document.querySelector('.pagination__button--active');

        activeButton.classList.remove('pagination__button--active');
        activeButton.removeAttribute('disabled');

        button.classList.add('pagination__button--active');
        button.setAttribute('disabled', true);

        const { page } = button.dataset;

        this.setState({ activePage: +page });

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}
