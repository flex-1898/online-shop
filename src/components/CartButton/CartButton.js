import cn from 'classnames';

import { Component } from '../../core/Component';
import { Button } from '../Button/Button';
import './CartButton.scss';

const DEFAULT_TYPE = 'text';
const DEFAULT_AUTOCOMPLETE = 'off';

export class CartButton extends Component {
    constructor(options = {}) {
        const { gs, className, buttonClassName } = options;
        const { cart } = gs.state;

        const button = new Button({
            className: cn('button--secondary cart-button__button', buttonClassName),
            title: 'Open cart',
            children: '<i class="fas fa-shopping-bag cart-button__icon"></i>'
        });

        super({ className: cn('cart-button', className) });

        gs.subscribe(this);

        const totalQuantity = this._calculateTotalQuantity(cart);

        this.children(`
            <span class="cart-button__quantity">${totalQuantity}</span>
            ${button.toHTML()}
        `);
    }

    _calculateTotalQuantity(cart) {
        return cart.reduce((total, { qty }) => total + qty, 0);
    }

    _render(prevState, currentState) {
        const isSameCart = prevState.cart === currentState.cart;

        if (isSameCart) return;

        const { cart } = currentState;

        console.log('[cart]', cart);

        const totalQuantity = this._calculateTotalQuantity(cart);

        const quantityHolder = document.querySelector('.cart-button__quantity');
        quantityHolder.textContent = totalQuantity;
    }
}
