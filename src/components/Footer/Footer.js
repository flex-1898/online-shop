import { Component } from '../../core/Component';
import './Footer.scss';

export class Footer extends Component {
    constructor() {
        const date = new Date();
        const year = date.getFullYear();

        super({
            tagName: 'footer',
            className: 'footer',
            children: `
                <div class="width-limiter">
                    <strong class="footer__copyright">All Rights Reserved, ${year}</strong>
                </div>
            `
        });
    }
}
