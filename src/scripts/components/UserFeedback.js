class UserFeedback extends HTMLElement {
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
                        :host{
                              display: inline-block;
                              box-shadow: 0 4px 8px 0 rgba(52, 73, 94, 0.2);
                              border-radius: 20px;
                              overflow: hidden;
                              color: #581c0c;
                              background-color: #fff;   
                              padding: 20px;                        
                              margin-bottom: 20px;                                                     
                        }

                        .feedback_user_pic{
                          width: 100%;
                          max-width: 80px;
                        }

                        .card_header{
                          display: grid;
                          grid-template-columns: .5fr 2fr;
                          grid-column-gap: 20px;   
                        }

                        .card_header h4,
                        .card_header p{
                          margin: 0;
                        }

                        .card_header_right{
                          padding-top: 8px;
                        }

                        .wrapword {
                          white-space: -moz-pre-wrap !important;  /* Mozilla, since 1999 */
                          white-space: -pre-wrap;      /* Opera 4-6 */
                          white-space: -o-pre-wrap;    /* Opera 7 */
                          white-space: pre-wrap;       /* css-3 */
                          word-wrap: break-word;       /* Internet Explorer 5.5+ */
                          white-space: -webkit-pre-wrap; /* Newer versions of Chrome/Safari*/
                          word-break: break-all;
                          white-space: normal;
                        }
            
                  </style>
                  
                  <div class="card_content">
                    <div class="card_header">
                      <img class="feedback_user_pic" src="./images/user.png" alt="${this._list.name}"/>
                      <div class="card_header_right">
                        <h4 class="feedback_username" tabindex="0">${this._list.name}</h4>
                        <p class="feedback_date" tabindex="0">${this._list.date}</p>
                      </div>
                    </div>
                    <div class="card_content_detail">
                      <p class="feedback_content wrapword" tabindex="0">${this._list.review}</p>
                    </div>             
                  </div>    
                `;
  }
}
customElements.define('user-feedback', UserFeedback);
