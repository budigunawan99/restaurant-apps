import {itActsAsFavoriteRestaurantModel} from './contract/favoriteRestaurantContract';

let favoriteRestaurants = [];

const Exception = (message) => message;

const FavoriteRestaurantArray = {
  getRestaurant(id) {
    if (!id) {
      return;
    }

    return favoriteRestaurants.find((restaurant) => restaurant.id === id);
  },

  getAllRestaurants() {
    if (Array.isArray(favoriteRestaurants) && favoriteRestaurants.length) {
      return favoriteRestaurants;
    } else {
      throw Exception('Tidak ada data yang telah difavoritkan.');
    }
  },

  putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    if (this.getRestaurant(restaurant.id)) {
      return;
    }

    favoriteRestaurants.push(restaurant);
  },

  deleteRestaurant(id) {
    favoriteRestaurants = favoriteRestaurants.filter(
      (restaurant) => restaurant.id !== id,
    );
  },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => favoriteRestaurants = []);

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});
