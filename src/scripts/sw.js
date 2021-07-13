importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js',
);
import 'regenerator-runtime';
import CONFIG from './globals/config';

const {assets} = global.serviceWorkerOption;

const additionalAssets = [
  './',
  '/images/hero-image_1.jpg',
  '/images/hero-image_1-small.jpg',
  '/images/nodata.png',
  '/images/nodata-small.png',
];

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

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg|ico|webp)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'runtime-images',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    }),
  );
} else {
  console.log(`Workbox gagal dimuat`);
}
