import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';
import '../../components/RestaurantList';

const Favorite = {
  async render() {
    return `
      <section id="content">
            <div class="content_header">
                <h2 class="content_title" tabindex="0">
                    Favorite
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
      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      restaurantlist.lists = restaurants;
    } catch (message) {
      restaurantlist.renderErr(message);
    }
  },
};

export default Favorite;
