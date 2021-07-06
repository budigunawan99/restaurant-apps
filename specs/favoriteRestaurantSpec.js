import * as TestFactories from './helpers/testFactories';
import FavoriteRestaurantIdb from '../src/scripts/data/favoriterestaurant-idb';
import '../src/scripts/components/FavoriteButton';

let favoriteButtonContainer;

describe('Favoriting A Restaurant', () => {
  beforeEach(() => {
    favoriteButtonContainer = document.createElement('favorite-button');
  });

  it('should show the favorite button when the restaurant has not been favorited before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant(
      favoriteButtonContainer,
      {id: 1},
    );
    expect(
      favoriteButtonContainer.button.getAttribute('aria-label') ===
        'add this restaurant to your favorite list',
    ).toBeTruthy();
  });

  it('should not show the un-favorite button when the restaurant has not been favorited before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant(
      favoriteButtonContainer,
      {id: 1},
    );
    expect(
      favoriteButtonContainer.button.getAttribute('aria-label') ===
        'remove this restaurant from your favorite list',
    ).toBeFalsy();
  });

  it('should be able to favorite the restaurant', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant(
      favoriteButtonContainer,
      {id: 1},
    );
    favoriteButtonContainer.button.dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);

    expect(restaurant).toEqual({id: 1});
    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already favorited', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant(
      favoriteButtonContainer,
      {id: 1},
    );

    await FavoriteRestaurantIdb.putRestaurant({id: 1});
    favoriteButtonContainer.button.dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{id: 1}]);
    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant(
      favoriteButtonContainer,
      {},
    );

    favoriteButtonContainer.button.dispatchEvent(new Event('click'));

    expect(
      await TestFactories.catcher(FavoriteRestaurantIdb.getAllRestaurants()),
    ).toEqual('Tidak ada data yang telah difavoritkan.');
  });
});
