import FavoriteButtonPresenter from '../../src/scripts/utils/favorite-button-presenter';
import FavoriteRestaurantIdb from '../../src/scripts/data/favoriterestaurant-idb';

const createFavoriteButtonPresenterWithRestaurant = async (
  favoriteButtonContainer,
  restaurant,
) => {
  await FavoriteButtonPresenter.init({
    favoriteButtonContainer: favoriteButtonContainer,
    favoriteRestaurants: FavoriteRestaurantIdb,
    restaurant,
  });
};

const catcher = async (todo) => {
  try {
    return await todo;
  } catch (exception) {
    return exception;
  }
};

export {createFavoriteButtonPresenterWithRestaurant, catcher};
