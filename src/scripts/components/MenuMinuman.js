class MenuMinuman extends HTMLElement {
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
                        .box{
                          display: grid;
                          grid-row-gap: 5px;
                          text-align: center;
                        }

                        .box_picture{
                          width: 100%;
                          margin: 0 auto;
                          max-width: 50px;
                        }
                  </style>
                  
                  
                  <div class="box">
                    <picture>
                      <source type="image/webp" srcset="./images/drink_default.webp">
                      <img class="box_picture" src="./images/drink_default.png" alt="${this._list.name}"/>
                    </picture>
                    <p tabindex="0">${this._list.name}</p>
                  </div>
                  
                  
                `;
  }
}
customElements.define('menu-minuman', MenuMinuman);
