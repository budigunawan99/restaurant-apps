importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js',
);
import 'regenerator-runtime';
import CONFIG from './globals/config';

const {assets} = global.serviceWorkerOption;

const additionalAssets = ['./'];

const staticAssets = assets.concat(additionalAssets).map((element) => {
  return {url: element, revision: CONFIG.VERSION};
});

const staleWhileRevalidateStrategy =
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'api',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  });

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
  workbox.core.clientsClaim();
  workbox.core.skipWaiting();

  workbox.precaching.precacheAndRoute([...staticAssets], {
    // Ignore all URL parameters.
    ignoreURLParametersMatching: [/.*/],
  });

  workbox.routing.registerRoute(
    ({url}) => url.origin === CONFIG.BASE_URL,
    staleWhileRevalidateStrategy,
  );
} else {
  console.log(`Workbox gagal dimuat`);
}
