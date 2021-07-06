import API_ENDPOINT from '../globals/api-endpoint';
import Loader from '../utils/loader';

class RestaurantSource {
  static async listRestaurant() {
    try {
      const responseJson = await this._fetchingProcess(API_ENDPOINT.LIST);
      return responseJson.restaurants;
    } catch (msg) {
      Loader.init(false);
      console.log('Error', msg);
      throw new Error(`Gagal menerima data. Periksa kembali koneksi Anda!`);
    }
  }

  static async detailRestaurant(id) {
    try {
      const responseJson = await this._fetchingProcess(API_ENDPOINT.DETAIL(id));
      return responseJson.restaurant;
    } catch (msg) {
      Loader.init(false);
      console.log('Error', msg);
      throw new Error(`Gagal menerima data. Periksa kembali koneksi Anda!`);
    }
  }

  static async postFeedback(object) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': API_ENDPOINT.API_TOKEN,
        },
        body: JSON.stringify(object),
      };
      const responseJson = await this._fetchingProcess(
        API_ENDPOINT.REVIEW,
        options,
      );
      return responseJson;
    } catch (msg) {
      Loader.init(false);
      console.log('Error', msg);
      throw new Error(`Gagal mengirim data. Periksa kembali koneksi Anda!`);
    }
  }

  static async _statusResponse(response) {
    if (response.status !== 200) {
      throw new Error(`${response.statusText}`);
    }
  }

  static async _checkResponseJson(responseJson) {
    if (Object.keys(responseJson).length === 0) {
      throw new Error(`Restaurant is not found`);
    }
  }

  static async _fetchingProcess(api, options) {
    Loader.init(true);
    const response = await fetch(api, options);
    await this._statusResponse(response);
    const responseJson = await response.json();
    await this._checkResponseJson(responseJson);
    Loader.init(false);
    return responseJson;
  }
}

export default RestaurantSource;
