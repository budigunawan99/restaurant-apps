import * as TestFactories from './helpers/testFactories';
import FavoriteRestaurantIdb from '../src/scripts/data/favoriterestaurant-idb';

let favoriteButtonContainer;

describe('Unfavorite A Restaurant', () => {
  beforeEach(async () => {
    favoriteButtonContainer = document.createElement('favorite-button');
    await FavoriteRestaurantIdb.putRestaurant({id: 1});
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should display unfavorite widget when the restaurant has been favorited', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant(
      favoriteButtonContainer,
      {id: 1},
    );

    expect(
      favoriteButtonContainer.button.getAttribute('aria-label') ===
        'remove this restaurant from your favorite list',
    ).toBeTruthy();
  });

  it('should not display favorite widget when the restaurant has been favorited', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant(
      favoriteButtonContainer,
      {id: 1},
    );

    expect(
      favoriteButtonContainer.button.getAttribute('aria-label') ===
        'add this restaurant to your favorite list',
    ).toBeFalsy();
  });

  it('should be able to remove favorited restaurant from the list', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant(
      favoriteButtonContainer,
      {id: 1},
    );

    favoriteButtonContainer.button.dispatchEvent(new Event('click'));

    expect(
      await TestFactories.catcher(FavoriteRestaurantIdb.getAllRestaurants()),
    ).toEqual('Tidak ada data yang telah difavoritkan.');
  });

  it('should not throw error if the unfavorited restaurant is not in the list', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant(
      favoriteButtonContainer,
      {id: 1},
    );

    await FavoriteRestaurantIdb.deleteRestaurant(1);

    favoriteButtonContainer.button.dispatchEvent(new Event('click'));

    expect(
      await TestFactories.catcher(FavoriteRestaurantIdb.getAllRestaurants()),
    ).toEqual('Tidak ada data yang telah difavoritkan.');
  });
});
