import './RestaurantListItem.js';
import pageOnError from '../views/templates/page-on-error';
import CreateSubElement from '../utils/create-sub-element';

class RestaurantList extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
  }

  set lists(lists) {
    this._lists = lists;
    this.render();
    this.afterRender();
  }

  render() {
    this._shadowRoot.innerHTML = `
                  <style>
                        :host {
                              display: grid;
                              grid-column-gap: 20px; 
                              grid-row-gap: 20px;
                        }

                        @media screen and (min-width: 650px) {
                              :host {
                                   display: grid;
                                   grid-template-columns: 1fr 1fr;
                                   grid-column-gap: 28px;
                                   grid-row-gap: 10px;
                               }
                        }

                        @media screen and (min-width: 950px) {
                              :host {
                                  display: grid;
                                  grid-template-columns: 1fr 1fr 1fr;
                              }
                        }
                  </style>      
            `;
  }

  afterRender() {
    CreateSubElement.init({
      data: this._lists,
      element: 'restaurant-list-item',
      parent: this._shadowRoot,
    });
  }

  renderErr(message) {
    this._shadowRoot.innerHTML = '';
    this._shadowRoot.innerHTML += pageOnError(message);
  }
}

customElements.define('restaurant-list', RestaurantList);
