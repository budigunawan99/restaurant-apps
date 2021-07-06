class FavoriteButton extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
  }
  set event(event) {
    this._event = event;
    this.render();
  }

  get button() {
    return this._shadowRoot.querySelector('#favoriteButton');
  }

  render() {
    this._shadowRoot.innerHTML = `
                  <style>
                        .favorite {
                          font-size: 18px;
                          position: fixed;
                          bottom: 20px;
                          right: 20px;
                          background-color: #ca5116;
                          color: #f1e3cb;
                          border: 0;
                          border-radius: 50%;
                          width: 55px;
                          height: 55px;
                          cursor: pointer;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 
                                      0 3px 1px -2px rgb(0 0 0 / 12%), 
                                      0 1px 5px 0 rgb(0 0 0 / 20%);
                      }

                      .material-icons {
                        font-family: "Material Icons";
                        font-weight: normal;
                        font-style: normal;
                        font-size: 28px; /* Preferred icon size */
                        display: inline-block;
                        line-height: 1;
                        text-transform: none;
                        letter-spacing: normal;
                        word-wrap: normal;
                        white-space: nowrap;
                        direction: ltr;
                  
                        /* Support for all WebKit browsers. */
                        -webkit-font-smoothing: antialiased;
                        /* Support for Safari and Chrome. */
                        text-rendering: optimizeLegibility;
                  
                        /* Support for Firefox. */
                        -moz-osx-font-smoothing: grayscale;
                  
                        /* Support for IE. */
                        font-feature-settings: "liga";
                      }
                  </style>                 
                `;
    if (this._event) {
      this._shadowRoot.innerHTML += `
          <button aria-label="remove this restaurant from your favorite list" id="favoriteButton" class="favorite">
            <i class="material-icons" aria-hidden="true">star</i>
          </button>
      `;
    } else {
      this._shadowRoot.innerHTML += `
          <button aria-label="add this restaurant to your favorite list" id="favoriteButton" class="favorite">
            <i class="material-icons" aria-hidden="true">star_border</i>
          </button>
      `;
    }
  }
}
customElements.define('favorite-button', FavoriteButton);
