import { App } from './components/App/App';
import { GlobalState } from './core/GlobalState';
import { render } from './core/render';
import products from './assets/database/products.json';
import './styles/index.scss';

const INITIAL_CATEGORY = 'TV';
const INITIAL_PAGE = 1;

const gs = new GlobalState({
    activeCategory: INITIAL_CATEGORY,
    activePage: INITIAL_PAGE,
    cart: []
});

const options = {
    gs,
    categories: [...new Set(products.map(p => p.category))],
    products
};

const app = new App(options);

render(app, document.getElementById('app'));
