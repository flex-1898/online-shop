import { Component } from '../../core/Component';
import { Button } from '../Button/Button';
import { CartButton } from '../CartButton/CartButton';
import './Header.scss';

export class Header extends Component {
    constructor(options = {}) {
        const { gs } = options;

        const button = new Button({
            className: 'button--primary header__button',
            title: 'Sign In',
            children: 'Sign In'
        });

        const cartButton = new CartButton({ gs });

        super({
            tagName: 'header',
            className: 'header',
            children: `
                <div class="width-limiter header__wrapper">
                    <h1 class="header__title">Online Shop</h1>

                    <div class="header__actions">
                        ${button.toHTML()}
                        ${cartButton.toHTML()}
                    </div>
                </div>
            `
        });
    }
}
