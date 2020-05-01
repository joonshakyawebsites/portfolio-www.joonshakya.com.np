
const cacheName = 'pwa-conf-v1';
const staticAssets = [
  './assets/',
  './',
  './Joon.png',
  './index.html'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName); 
    await cache.addAll(staticAssets); 
});

self.addEventListener('fetch', event => {

});
