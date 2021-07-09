import RestaurantSource from '../../data/restaurant-source';
import '../../components/RestaurantList';

const Home = {
  async render() {
    return `
      <section id="jumbotron">
            <div class="jumbotron_inner">
                  <picture>
                    <source type="image/webp" srcset="./images/kopihalilintartext.webp">
                    <img class="img_jumbotron" src="./images/kopihalilintartext.png"
                          alt="Gambar Utama Jumbotron" width="60%" height="60%">
                  </picture>
                  <p class="jumbotron_subtitle" tabindex="0">Temukan kafe favorit Anda di mana saja dan kapan saja
                        hanya
                        di KopiTiam
                  </p>
            </div>
      </section>
      <section id="content">
           <div class="content_header">
               <h2 class="content_title" tabindex="0">
                   Explore Restaurant
               </h2>
               <hr>
           </div>
           <restaurant-list></restaurant-list>
      </section>
           `;
  },

  async afterRender() {
    const restaurantlist = document.querySelector('restaurant-list');
    try {
      const restaurants = await RestaurantSource.listRestaurant();
      restaurantlist.lists = restaurants;
    } catch (msg) {
      restaurantlist.renderErr(msg);
    }
  },
};

export default Home;
