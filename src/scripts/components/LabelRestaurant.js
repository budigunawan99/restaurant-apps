class LabelRestaurant extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
  }
  set list(list) {
    this._list = list;
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
                  <style>
                        .label {
                              display: inline-block;
                              color: #f1e3cb;
                              padding: 5px;
                              background-color: #ca5116;
                              border-radius: 5px;
                              margin: 8px 8px 0 0;      
                        }
                  </style>
                  
                  <span class="label" tabindex="0">${this._list.name}</span>
                  
                `;
  }
}
customElements.define('label-restaurant', LabelRestaurant);
