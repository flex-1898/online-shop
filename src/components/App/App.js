import { Component } from '../../core/Component';
import { Header } from '../Header/Header';
import { Toolbar } from '../Toolbar/Toolbar';
import { ProductList } from '../ProductList/ProductList';
import { Pagination } from '../Pagination/Pagination';
import { Footer } from '../Footer/Footer';
import { render } from '../../core/render';
import './App.scss';

export class App extends Component {
    constructor(options = {}) {
        const { gs, categories, products } = options;

        super({
            className: 'app',
            children: [
                new Header({ gs }),
                new Toolbar({ gs, categories }),
                `<div class="width-limiter app__content">
                    <aside class="app__sidebar">Sidebar (WIP)</aside>
                    <main class="app__main"></main>
                </div>`,
                new Footer()
            ]
        });

        render(
            [
                new ProductList({ gs, items: products }),
                new Pagination({ className: 'app__pagination', gs, products })
            ],
            this._component.querySelector('.app__main')
        );
    }
}
