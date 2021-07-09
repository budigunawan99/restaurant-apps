import CONFIG from '../globals/config';
import pageOnError from '../views/templates/page-on-error';
import './LabelRestaurant';
import './MenuMakanan';
import './MenuMinuman';
import './UserFeedback';
import './FavoriteButton';
import './FormFeedback';
import CreateSubElement from '../utils/create-sub-element';
import FavoriteButtonPresenter from '../utils/favorite-button-presenter';
import PostFeedbackHelper from '../utils/post-feedback-helper';
import FavoriteRestaurantIdb from '../data/favoriterestaurant-idb';

class DetailRestaurant extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
  }

  set list(list) {
    this._list = list;
    this.render();
    this.afterRender();
  }

  render() {
    this._shadowRoot.innerHTML = `
                  <style>
                        :host{
                              color: #581c0c;
                        }

                        h3{
                              font-size: 1.3em;
                        }

                        .content_header {
                              margin-bottom: 35px;
                        }

                        hr {
                              width: 15%;
                              border: 2px solid #581c0c;
                              margin-top: -15px;
                              border-radius: 5px;
                        }
                        
                        .content_title {
                              text-transform: uppercase;
                              text-align: center;
                              font-size: 2.5em;
                              font-weight: bold;
                              color: #581c0c;
                        }

                        .rest_detail .rest_picture {
                              width: 100%;
                              border-radius: 25px;
                        }

                        .rest_detail .rest_info h3 {
                              margin: 8px 0;
                        }     

                        .rating i,
                        .rest_alamat i{
                              position: relative;
                              top: 7px;
                        } 

                        .deskripsi{
                              text-align: justify;
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

                        .rest_info{
                              display: grid;
                              grid-template-rows: 1fr 1fr 1fr;
                              grid-row-gap: 20px; 
                              margin-top: 40px;
                        }

                        .card{
                              display: block;
                              margin-bottom: 18px;
                              box-shadow: 0 4px 8px 0 rgba(52, 73, 94, 0.2);
                              border-radius: 20px;
                              overflow: hidden;
                              color: #581c0c;
                              background-color: #fff;
                              padding: 2% 6%;
                        }

                        .list_menu{
                              display: grid;
                              grid-column-gap: 5px; 
                              grid-row-gap: 40px;
                        }

                        .menu_title_container{
                              display: inline-block;
                              color: #f1e3cb;
                              padding: 8px;
                              background-color: #ca5116;
                              border-radius: 20px;
                              margin: 20px 0 40px 0;
                        }

                        .menu_title_container h4{
                              margin: 0;
                        }

                        .rest_feedback_content{
                              padding: 20px;
                              margin-bottom: 20px;
                              background-color: #EC9C6C;
                              overflow-x: hidden;
                              overflow-y: scroll;
                              max-height: 400px;
                              border-radius: 20px;
                              display: grid;
                              grid-template-columns: 1fr;
                        }

                        @media screen and (min-width: 750px) {
                              .menu_container{
                                    display: grid;
                                    grid-template-columns: 1fr 1fr;
                                    grid-column-gap: 20px; 
                              }

                              .list_menu{
                                    grid-template-columns: repeat(2, 1fr); 
                                    grid-row-gap: 10px;                          
                              }

                              .rest_feedback_content{
                                    grid-template-columns: repeat(2, 1fr);
                                    grid-column-gap: 20px;
                              }
                        }

                        @media screen and (min-width: 1096px) {
                              .rest_detail{
                                    display: grid;
                                    grid-template-columns: auto 1fr;
                                    grid-column-gap: 40px; 
                                    margin-bottom: 50px;
                              }

                              .rest_detail .rest_picture {
                                    width: 100%;
                                    max-width: 600px;
                                    margin-top: 8px;
                              }

                              .rest_info{
                                    margin-top: 0;
                              }

                              .list_menu{
                                    grid-template-columns: repeat(3, 1fr);                           
                              }

                              .rest_feedback_content{                                    
                                    grid-template-columns: repeat(3, 1fr);
                                    grid-column-gap: 20px;
                              }
                        }

                        @media screen and (min-width: 1440px) {
                              .list_menu{
                                grid-template-columns: repeat(4, 1fr);                
                              }
                        }
                       
                  </style>     
                  
                  <article>
                        <div class="content_header">
                              <h2 class="content_title" tabindex="0">
                                    ${this._list.name}
                              </h2>
                              <hr>
                        </div>

                        <div class="rest_detail">
                              <picture>
                                    <source media="(max-width: 1024px)" srcset="${CONFIG.BASE_IMAGE_URL}small/${this._list.pictureId}" alt="${this._list.name}">
                                    <img class="rest_picture" src="${CONFIG.BASE_IMAGE_URL}medium/${this._list.pictureId}" alt="${this._list.name}" 
                                          onerror="this.onerror = null; this.src='./images/default.jpg';"/>
                              </picture>
                              <div class="rest_info">
                                    <div class="rest_rating">
                                          <h3 tabindex="0">Rating</h3>
                                          <p class="rating" tabindex="0"><i class="material-icons" aria-hidden="true">star</i> ${this._list.rating}</p>
                                    </div>       
                                    <div class="rest_alamat">
                                          <h3 tabindex="0">Alamat</h3>
                                          <p tabindex="0">
                                                <i class="material-icons" aria-hidden="true">location_on</i> ${this._list.address}, ${this._list.city}
                                          </p>
                                    </div>
                                    <div class="rest_kategori">
                                          <h3 tabindex="0">Kategori</h3>
                                          <div class="rest_label"></div>
                                    </div>              
                              </div>
                        </div>

                        <div class="rest_deskripsi">
                              <h3 tabindex="0">Deskripsi</h3>
                              <p class="deskripsi" tabindex="0">${this._list.description}</p>    
                        </div>

                        <div class="rest_menu">
                              <h3 tabindex="0">Menu</h3>
                              <div class="menu_container">
                                    <div class="card">
                                          <div class="card_content">
                                                <div class="menu_title_container">
                                                      <h4 tabindex="0">Makanan</h4>
                                                </div>
                                                <div class="list_menu list_makanan"></div>
                                          </div>                                    
                                    </div>
                                    <div class="card">
                                          <div class="card_content">
                                                <div class="menu_title_container">
                                                      <h4 tabindex="0">Minuman</h4>
                                                </div>
                                                <div class="list_menu list_minuman"></div>
                                          </div>
                                    </div>
                              </div> 
                        </div>

                        <div class="rest_feedback">
                              <h3 tabindex="0">Apa Kata Mereka ?</h3>
                              <div class="rest_feedback_content"></div>
                        </div>

                        <div class="rest_form_feedback">
                              <h3 tabindex="0">Tambah Ulasan</h3>                             
                        </div>
                  </article>                 
            `;
  }

  afterRender() {
    CreateSubElement.init({
      data: this._list.categories,
      element: 'label-restaurant',
      parent: this._shadowRoot.querySelector('.rest_label'),
    });

    CreateSubElement.init({
      data: this._list.menus.foods,
      element: 'menu-makanan',
      parent: this._shadowRoot.querySelector('.list_makanan'),
    });

    CreateSubElement.init({
      data: this._list.menus.drinks,
      element: 'menu-minuman',
      parent: this._shadowRoot.querySelector('.list_minuman'),
    });
    this.feedbackInit();
    this.formFeedbackInit();
    this.favoriteButtonInit();
  }

  feedbackInit() {
    const feedbackContainer = this._shadowRoot.querySelector(
      '.rest_feedback_content',
    );
    CreateSubElement.init({
      data: this._list.customerReviews,
      element: 'user-feedback',
      parent: feedbackContainer,
    });
  }

  formFeedbackInit() {
    const formFeedbackContainer = this._shadowRoot.querySelector(
      '.rest_form_feedback',
    );
    const formFeedback = document.createElement('form-feedback');
    formFeedback.id = this._list.id;

    PostFeedbackHelper.init({
      feedbackComponent: 'user-feedback',
      feedbackContainer: this._shadowRoot.querySelector(
        '.rest_feedback_content',
      ),
      formFeedback: formFeedback,
    });

    formFeedbackContainer.appendChild(formFeedback);
  }

  favoriteButtonInit() {
    const favoriteButtonContainer = document.createElement('favorite-button');
    FavoriteButtonPresenter.init({
      favoriteButtonContainer: favoriteButtonContainer,
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: this._list.id,
        name: this._list.name,
        description: this._list.description,
        pictureId: this._list.pictureId,
        city: this._list.city,
        rating: this._list.rating,
      },
    });
    this._shadowRoot.appendChild(favoriteButtonContainer);
  }

  renderErr(message) {
    this._shadowRoot.innerHTML = '';
    this._shadowRoot.innerHTML += pageOnError(message);
  }
}

customElements.define('detail-restaurant', DetailRestaurant);
