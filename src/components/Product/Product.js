import { Component } from '../../core/Component';
import { Button } from '../Button/Button';
import { Rating } from '../Rating/Rating';
import { Loader } from '../Loader/Loader';
import './Product.scss';

const MAX_CHARS_AMOUNT = 150;

export class Product extends Component {
    constructor(options = {}) {
        const {
            id,
            category,
            model,
            manufacturer,
            country,
            imageSrc,
            price,
            rating,
            description,
            warranty
        } = options;

        const stars = new Rating({ value: rating });
        const shortDescription = description.slice(0, MAX_CHARS_AMOUNT);

        const loader = new Loader();

        const wishlistButton = new Button({
            className: 'button--primary product__button product__button--wishlist',
            title: 'Add to Wishlist',
            children: '<i class="fas fa-heart product__icon"></i>'
        });

        const cartButton = new Button({
            className: 'button--primary product__button product__button--cart',
            title: 'Add to Cart',
            children: '<i class="fas fa-shopping-bag product__icon"></i>'
        });

        super({
            className: 'product',
            attrs: {
                'data-id': id
            },
            children: `
                <div class="product__header">
                    <h2 class="product__category">${category}</h2>
                    ${stars.toHTML()}
                </div>

                <div class="product__main">
                    <div class="product__image-wrapper">
                        <img src="${imageSrc}" alt="${model}" class="product__image product__image--hidden">
                        ${loader.toHTML()}
                    </div>

                    <div class="product__info">
                        <h2 class="product__manufacturer">${manufacturer}</h2>
                        <h3 class="product__model">${model}</h3>
                        <h4 class="product__country">${country}</h4>
                        <span class="product__warranty">Warranty: ${warranty}</span>
                        <p class="product__description">${shortDescription}</p>
                    </div>
                </div>

                <div class="product__footer">
                    <div class="product__price-wrapper">
                        <span class="product__label">Price</span>

                        <div>
                            <span class="product__price">${price}</span>
                            <span class="product__currency">USD</span>
                        </div>
                    </div>

                    <div class="product__actions">
                        ${wishlistButton.toHTML()}
                        ${cartButton.toHTML()}
                    </div>
                </div>
            `
        });

        this._image = this._component.querySelector('.product__image');

        this._image.addEventListener('load', this.handleImageLoad.bind(this));
    }

    handleImageLoad() {
        setTimeout(() => {
            const loader = this._image.nextElementSibling;

            loader.remove();
            this._image.classList.remove('product__image--hidden');
        }, 300);
    }
}
