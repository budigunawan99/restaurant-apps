import {openDB} from 'idb';
import CONFIG from '../globals/config';

const {DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME} = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, {keyPath: 'id'});
  },
});

const Exception = (message) => message;
const FavoriteRestaurantIdb = {
  async getRestaurant(id) {
    if (!id) {
      return;
    }
    const data = (await dbPromise).get(OBJECT_STORE_NAME, id);
    return data;
  },
  async getAllRestaurants() {
    const data = (await dbPromise).getAll(OBJECT_STORE_NAME);
    if (Object.keys(await data).length !== 0) {
      return data;
    } else {
      throw Exception('Tidak ada data yang telah difavoritkan.');
    }
  },
  async putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    const onUpdate = (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
    return onUpdate;
  },
  async deleteRestaurant(id) {
    const onDelete = (await dbPromise).delete(OBJECT_STORE_NAME, id);
    return onDelete;
  },
};

export default FavoriteRestaurantIdb;
