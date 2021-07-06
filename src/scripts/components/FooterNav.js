class FooterNav extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML =
                  `  
                  <style>                                   
                        footer {
                              background-color: #ca5116;
                              color:  #f1e3cb;                              
                              min-height: 35px;
                              padding: 1%;
                              text-align: center;
                        } 
                        
                  </style>
                  
                  <footer>
                        <p tabindex="0">Copyright &#169; 2021 - KopiTiam</p>
                  </footer>
            `;
  }
}

customElements.define('footer-nav', FooterNav);
