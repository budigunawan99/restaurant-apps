import RestaurantSource from '../data/restaurant-source';

const PostFeedbackHelper = {
  async init({feedbackComponent, feedbackContainer, formFeedback}) {
    this._feedbackComponent = feedbackComponent;
    this._feedbackContainer = feedbackContainer;
    this._formFeedback = formFeedback;
    await this._triggerButton();
  },

  async _triggerButton() {
    const button = this._formFeedback.button;
    button.addEventListener('click', async (event) => {
      if (!this._isNull(this._formFeedback.value)) {
        event.preventDefault();
        try {
          const response = await RestaurantSource.postFeedback(
            this._formFeedback.value,
          );
          this._onSuccess(response);
          console.log(this._formFeedback.value);
        } catch (message) {
          this._onError(message);
        }
      }
    });
  },

  _isNull(object) {
    return Object.values(object).indexOf('undefined') >= 0;
  },

  _onSuccess(response) {
    this._formFeedback.value = null;
    this._newFeedback(response.customerReviews);
  },

  _onError(message) {
    this._formFeedback.renderErr(message);
  },

  _newFeedback(reviewResponse) {
    const item = document.createElement(this._feedbackComponent);
    item.list = reviewResponse[reviewResponse.length - 1];
    this._feedbackContainer.appendChild(item);
  },
};

export default PostFeedbackHelper;
