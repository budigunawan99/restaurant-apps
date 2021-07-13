const assert = require('assert');
const TEST_NAME = 'Budi Gunawan';
const TEST_REVIEW = 'This is e2e testing';

Feature('Posting Reviews');

Before(({I}) => {
  I.amOnPage('/');

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

  I.seeElement('detail-restaurant');
});

Scenario('posting a review successfully', async ({I}) => {
  // make sure input nama is empty before fill
  I.seeInShadow(
    `document.querySelector('detail-restaurant').shadowRoot
      .querySelector('form-feedback').shadowRoot
      .querySelector('input[id="nama"]:not([value])')`,
  );

  I.fillInShadow({
    shadowOne: 'detail-restaurant',
    shadowTwo: 'form-feedback',
    target: 'input[id="nama"]',
    value: TEST_NAME,
  });

  I.seeInShadow(
    `document.querySelector('detail-restaurant').shadowRoot
      .querySelector('form-feedback').shadowRoot
      .querySelector('input#nama').value.includes('${TEST_NAME}')`,
  );

  // make sure textarea review is empty before fill
  I.seeInShadow(
    `document.querySelector('detail-restaurant').shadowRoot
      .querySelector('form-feedback').shadowRoot
      .querySelector('textarea[id="review"]:not([value])')`,
  );

  I.fillInShadow({
    shadowOne: 'detail-restaurant',
    shadowTwo: 'form-feedback',
    target: 'textarea[id="review"]',
    value: TEST_REVIEW,
  });

  I.seeInShadow(
    `document.querySelector('detail-restaurant').shadowRoot
      .querySelector('form-feedback').shadowRoot
      .querySelector('textarea#review').value.includes('${TEST_REVIEW}')`,
  );

  I.seeInShadow(
    `document.querySelector('detail-restaurant').shadowRoot
      .querySelector('form-feedback').shadowRoot
      .querySelector('button#submit')`,
  );

  I.clickInShadow({
    shadowOne: 'detail-restaurant',
    shadowTwo: 'form-feedback',
    target: 'button#submit',
  });

  I.waitUntilLoaded();

  I.seeInShadow(
    `document.querySelector('detail-restaurant').shadowRoot
      .querySelector('.rest_feedback_content > user-feedback')`,
  );

  const visibleName = await I.getTextInShadow(
    `document.querySelector('detail-restaurant').shadowRoot
      .querySelector('user-feedback:last-of-type').shadowRoot
      .querySelector('.feedback_username')`,
  );

  const visibleReview = await I.getTextInShadow(
    `document.querySelector('detail-restaurant').shadowRoot
      .querySelector('user-feedback:last-of-type')
      .shadowRoot.querySelector('.feedback_content')`,
  );

  // make sure the visible name and review is same with the inserted name and review
  assert.strictEqual(TEST_NAME, visibleName);
  assert.strictEqual(TEST_REVIEW, visibleReview);

  // make sure the input and textarea is empty again
  I.seeInShadow(
    `document.querySelector('detail-restaurant').shadowRoot
      .querySelector('form-feedback').shadowRoot
      .querySelector('input[id="nama"]:not([value])')`,
  );

  I.seeInShadow(
    `document.querySelector('detail-restaurant').shadowRoot
      .querySelector('form-feedback').shadowRoot
      .querySelector('textarea[id="review"]:not([value])')`,
  );
});

Scenario('posting a review failed', async ({I}) => {
  // make sure input nama is empty before fill
  I.seeInShadow(
    `document.querySelector('detail-restaurant').shadowRoot
      .querySelector('form-feedback').shadowRoot
      .querySelector('input[id="nama"]:not([value])')`,
  );

  I.fillInShadow({
    shadowOne: 'detail-restaurant',
    shadowTwo: 'form-feedback',
    target: 'input[id="nama"]',
    value: TEST_NAME,
  });

  I.seeInShadow(
    `document.querySelector('detail-restaurant').shadowRoot
      .querySelector('form-feedback').shadowRoot
      .querySelector('input#nama').value.includes('${TEST_NAME}')`,
  );

  // make sure textarea review is empty before fill
  I.seeInShadow(
    `document.querySelector('detail-restaurant').shadowRoot
      .querySelector('form-feedback').shadowRoot
      .querySelector('textarea[id="review"]:not([value])')`,
  );

  I.fillInShadow({
    shadowOne: 'detail-restaurant',
    shadowTwo: 'form-feedback',
    target: 'textarea[id="review"]',
    value: TEST_REVIEW,
  });

  I.seeInShadow(
    `document.querySelector('detail-restaurant').shadowRoot
      .querySelector('form-feedback').shadowRoot
      .querySelector('textarea#review').value.includes('${TEST_REVIEW}')`,
  );

  I.seeInShadow(
    `document.querySelector('detail-restaurant').shadowRoot
      .querySelector('form-feedback').shadowRoot
      .querySelector('button#submit')`,
  );

  // simulate page is offline
  await I.setOffline();

  I.clickInShadow({
    shadowOne: 'detail-restaurant',
    shadowTwo: 'form-feedback',
    target: 'button#submit',
  });

  // see if there's an error message
  I.seeInShadow(
    `document.querySelector('detail-restaurant').shadowRoot
      .querySelector('form-feedback').shadowRoot
      .querySelector('#onErrorMessage').textContent
      .includes('Error: Gagal mengirim data. Periksa kembali koneksi Anda!')`,
  );
});
