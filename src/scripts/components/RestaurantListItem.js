import CONFIG from '../globals/config';
import TextLimiter from '../utils/text-limiter';

class RestaurantListItem extends HTMLElement {
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
                        :host {
                              display: block;
                              margin-bottom: 18px;
                              box-shadow: 0 4px 8px 0 rgba(52, 73, 94, 0.2);
                              border-radius: 10px;
                              overflow: hidden;
                              color: #581c0c;
                              background-color: #fff;
                        }

                        .article_thumbnail{
                              margin: 0;
                        }

                        .article_content{
                              padding: 5%;
                              display: grid;  
                              grid-template-rows: .8fr 2fr;                                                          
                        }
                        
                        p{
                              font-size: 1rem;
                        }

                        .article_content_rating i,
                        .location_text i{
                              position: relative;
                              top: 3px;
                        }  
                        
                        .article_detail_link{
                              text-align: right;   
                              padding: 2% 5%;                           
                        }

                        .article_detail_link i{
                              position: relative;
                              top: 5px;
                        }
                        
                        .material-icons {
                              font-family: "Material Icons";
                              font-weight: normal;
                              font-style: normal;
                              font-size: 20px; /* Preferred icon size */
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

                        .location_container{
                              position: relative;                             
                        }

                        .location_inner{
                              position: absolute;
                              top: 30px;
                              width: 40%;
                              background-color: rgba(0,0,0,.7);
                              color: #fff;
                              padding-left: 10px;
                              border-radius: 0 30px 30px 0;
                        }

                        .article_title_group {
                              display: grid;
                              grid-template-columns: 2fr 1fr;
                              grid-column-gap: 20px; 
                        }

                        .article_content_rating{
                              text-align:right;
                              font-size: 1.17em;
                        }

                        .article_content_text{
                              text-align: justify;
                        }   

                        .article_thumbnail_image {
                              height: 100%;
                              max-height: 280px;
                        }

                        .article_detail_link a{
                              display: inline-block;
                              color: #ca5116;
                              text-decoration: none;
                              min-width: 44px;
                              min-height: 44px;
                        }

                        
                        @media screen and (min-width: 1939px) {
                              .article_thumbnail_image {
                                    width: 100%;
                                    min-height: 450px;
                              }

                              .article_content{ 
                                    grid-template-rows: .5fr 1fr;                                                          
                              }
                        }

                        @media screen and (min-width: 1280px) {
                              .article_thumbnail_image {
                                    width: 100%;
                                    min-height: 300px;
                              }
                        }

                        @media screen and (max-width: 749px) {
                              .article_thumbnail_image {
                                    width: 100%;
                                    max-height: 400px;
                              }
                        }

                        @media screen and (max-width: 418px) {
                              .article_title_group {
                                    display: block;
                              }

                              .article_content_rating{
                                    text-align: left;
                                    font-size: 1em;
                              }
                        }

                  </style>
                  
                  <article> 
                        <div class="thumbnail">
                              <div class="location_container">
                                    <div class="location_inner">
                                          <p class="location_text" tabindex="0">
                                                <i class="material-icons" aria-hidden="true">
                                                      location_on
                                                </i> 
                                                ${this._list.city}
                                          </p>
                                    </div>                              
                              </div>
                              <figure class="article_thumbnail">
                                    <img loading="lazy" width="100%" height="100%" class="article_thumbnail_image" src="${
                                      CONFIG.BASE_IMAGE_URL
                                    }small/${this._list.pictureId}" alt="${
                                          this._list.name
                                    }" onerror="this.onerror = null; 
                                    this.src='./images/default.jpg';">                              
                              </figure>
                        </div>
                        
                        <div class="article_content">
                              <div class="article_title_group">
                                    <h3 class="article_content_title" tabindex="0">
                                      ${this._list.name} 
                                    </h3>
                                    <p class="article_content_rating" tabindex="0" aria-label="rating"><i class="material-icons" aria-hidden="true">star</i> ${
                                      this._list.rating
                                    }</p>
                              </div>
                             
                              <p class="article_content_text" tabindex="0">
                                ${TextLimiter(this._list.description, '200')}
                              </p>                               
                        </div>  
                        <div class="article_detail_link">
                              <a tabindex="0" href="${`/#/detail/${this._list.id}`}" aria-label="selengkapnya">
                                    Selengkapnya <i class="material-icons" aria-hidden="true">keyboard_arrow_right</i>
                              </a>
                        </div>                     
                  </article> 
                `;
  }
}
customElements.define('restaurant-list-item', RestaurantListItem);
