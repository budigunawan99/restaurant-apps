const assert = require('assert');

Feature('Favoriting Restaurants');

Before(({I}) => {
  I.amOnPage('/#/favorite');

  I.seeElement('restaurant-list');

  I.seeInShadow(
    `document.querySelector('restaurant-list').shadowRoot
      .querySelector('h3.warning').textContent
      .includes('Tidak ada data yang telah difavoritkan.')`,
  );
});

const simulateFavoriting = async ({I}) => {
  I.amOnPage('/');

  I.seeInShadow(
    `document.querySelector('restaurant-list').shadowRoot
      .querySelector('restaurant-list-item:first-of-type').shadowRoot
      .querySelector('.article_content_title')`,
  );

  const title = await I.getTextInShadow(
    `document.querySelector('restaurant-list').shadowRoot
      .querySelector('restaurant-list-item:first-of-type').shadowRoot
      .querySelector('.article_content_title')`,
  );

  I.seeInShadow(
    `document.querySelector('restaurant-list').shadowRoot
      .querySelector('restaurant-list-item:first-of-type').shadowRoot
      .querySelector('.article_detail_link a')`,
  );

  I.clickInShadow({
    shadowOne: 'restaurant-list',
    shadowTwo: 'restaurant-list-item:first-of-type',
    target: '.article_detail_link a',
  });

  I.seeInShadow(
    `document.querySelector('detail-restaurant').shadowRoot
      .querySelector('favorite-button').shadowRoot
      .querySelector('#favoriteButton')`,
  );

  I.clickInShadow({
    shadowOne: 'detail-restaurant',
    shadowTwo: 'favorite-button',
    target: '#favoriteButton',
  });

  I.amOnPage('/#/favorite');

  I.seeInShadow(
    `document.querySelector('restaurant-list').shadowRoot
      .querySelector('restaurant-list-item').shadowRoot
      .querySelector('.article_content_title')`,
  );

  const visibleTitle = await I.getTextInShadow(
    `document.querySelector('restaurant-list').shadowRoot
      .querySelector('restaurant-list-item').shadowRoot
      .querySelector('.article_content_title')`,
  );

  assert.strictEqual(title, visibleTitle);
};

Scenario('favoriting one restaurant', async ({I}) => {
  await simulateFavoriting({I});
});

Scenario('unfavorite one restaurant', async ({I}) => {
  await simulateFavoriting({I});

  I.seeInShadow(
    `document.querySelector('restaurant-list').shadowRoot
      .querySelector('restaurant-list-item').shadowRoot
      .querySelector('.article_detail_link a')`,
  );

  I.clickInShadow({
    shadowOne: 'restaurant-list',
    shadowTwo: 'restaurant-list-item',
    target: '.article_detail_link a',
  });

  I.seeInShadow(
    `document.querySelector('detail-restaurant').shadowRoot
      .querySelector('favorite-button').shadowRoot
      .querySelector('[aria-label="remove this restaurant from your favorite list"]')`,
  );

  I.clickInShadow({
    shadowOne: 'detail-restaurant',
    shadowTwo: 'favorite-button',
    target: '#favoriteButton',
  });

  I.seeInShadow(
    `document.querySelector('detail-restaurant').shadowRoot
      .querySelector('favorite-button').shadowRoot
      .querySelector('[aria-label="add this restaurant to your favorite list"]')`,
  );

  I.amOnPage('/#/favorite');

  I.seeInShadow(
    `document.querySelector('restaurant-list').shadowRoot
      .querySelector('h3.warning').textContent
      .includes('Tidak ada data yang telah difavoritkan.')`,
  );
});
