import {itActsAsFavoriteRestaurantModel} from './contract/favoriteRestaurantContract';
import FavoriteRestaurantIdb from '../src/scripts/data/favoriterestaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    const restaurantData = await TestFactories.catcher(
      FavoriteRestaurantIdb.getAllRestaurants(),
    );
    if (restaurantData !== 'Tidak ada data yang telah difavoritkan.') {
      (restaurantData).forEach(async (restaurant) => {
        await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
      });
    }
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb);
});
