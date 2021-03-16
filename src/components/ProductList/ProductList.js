import { Component } from '../../core/Component';
import { Product } from '../Product/Product';
import './ProductList.scss';

const PRODUCTS_PER_PAGE = 9;

export class ProductList extends Component {
    constructor(options = {}) {
        const { gs, items } = options;
        const { activeCategory, activePage } = gs.state;

        super({ className: 'product-list' });

        this.items = items;
        this.setState = gs.setState.bind(gs);
        gs.subscribe(this);

        const products = this._getFilteredProducts({ products: items, activeCategory, activePage });

        this.children(products);

        this.addEventListeners({
            click: this.handleAddProductToCart.bind(this)
        });
    }

    _getFilteredProducts({ products, activeCategory, activePage }) {
        const start = (activePage - 1) * PRODUCTS_PER_PAGE;
        const end = activePage * PRODUCTS_PER_PAGE;

        return products
            .filter(item => item.category === activeCategory)
            .slice(start, end)
            .map(item => new Product(item));
    }

    _render(prevState, currentState) {
        const isSameCategory = prevState.activeCategory === currentState.activeCategory;
        const isSamePage = prevState.activePage === currentState.activePage;

        if (isSameCategory && isSamePage) return;

        const { activeCategory, activePage } = currentState;

        const products = this._getFilteredProducts({
            products: this.items,
            activeCategory,
            activePage
        });

        this.clean().children(products);
    }

    handleAddProductToCart(e) {
        const button = e.target;
        const isNotCartButton = !button.closest('.product__button--cart');

        if (isNotCartButton) return;

        const parent = button.closest('[data-id]');

        const { id } = parent.dataset;

        this.setState(state => {
            const hasProduct = state.cart.some(product => product.id === +id);

            if (hasProduct) {
                const updatedCart = state.cart.map(product => {
                    if (product.id !== +id) return product;

                    return {
                        ...product,
                        qty: product.qty + 1
                    };
                });

                return { cart: updatedCart };
            }

            const newProduct = { id: +id, qty: 1 };
            const updatedCart = [...state.cart, newProduct];

            return { cart: updatedCart };
        });
    }
}
