import RestaurantSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';
import '../../components/DetailRestaurant';

const Detail = {
  async render() {
    return `
      <section id="content">
        <detail-restaurant></detail-restaurant>
      </section>
    `;
  },

  async afterRender() {
    const detailRestaurant = document.querySelector('detail-restaurant');
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    try {
      const restaurant = await RestaurantSource.detailRestaurant(url.id);
      console.log(restaurant);
      detailRestaurant.list = restaurant;
    } catch (msg) {
      detailRestaurant.renderErr(msg);
    }
  },
};

export default Detail;
