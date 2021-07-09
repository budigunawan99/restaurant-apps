class FormFeedback extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
  }

  set id(id) {
    this._id = id;
    this.render();
  }

  set value(value) {
    this._shadowRoot.getElementById('nama').value = value;
    this._shadowRoot.getElementById('review').value = value;
  }

  get value() {
    return {
      id: this._id,
      name: this._shadowRoot.getElementById('nama').value || 'undefined',
      review: this._shadowRoot.getElementById('review').value || 'undefined',
    };
  }

  get button() {
    return this._shadowRoot.getElementById('submit');
  }

  render() {
    this._shadowRoot.innerHTML = `
                  <style>
                    form{
                      display: grid;              
                      grid-row-gap: 15px;
                    }

                    input[type=text], textarea {
                      padding: 12px;
                      border: 1px solid #ccc;
                      border-radius: 15px;
                      resize: vertical;
                      min-width: 44px;
                      min-height: 44px;
                    }

                    button,
                    ::placeholder {
                      font-family: 'poppins', sans-serif;
                    }            

                    button{
                      border: none;
                      color: #f1e3cb;
                      background-color: #ca5116;
                      padding: 10px 0;
                      text-align: center;
                      text-decoration: none;
                      display: inline-block;
                      cursor: pointer;
                      width: 40%;  
                      min-width: 44px;
                      min-height: 44px;
                      border-radius: 15px;                  
                    }

                    button:hover{
                      background-color: #581c0c;
                    }
                    
                    #onErrorMessage{
                      color: red;
                    }
                  </style>
                  <form>
                      <input type="hidden" aria-hidden="true" id="id" value="${this._id}">
                      <input type="text" id="nama" placeholder="Ketik nama anda" aria-label="Ketik nama anda" required>                     
                      <textarea id="review" placeholder="Tulis review anda" aria-label="Tulis review anda" required></textarea>                      
                      <div id="onErrorMessage" tabindex="0"></div>
                      <button aria-label="Kirimkan form" id="submit">
                          Kirim
                      </button>
                  </form>   
                `;
  }

  renderErr(message) {
    const errorMessageContainer =
      this._shadowRoot.querySelector('#onErrorMessage');
    errorMessageContainer.innerHTML = message;
  }
}
customElements.define('form-feedback', FormFeedback);
