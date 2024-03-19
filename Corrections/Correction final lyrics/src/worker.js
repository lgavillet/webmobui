const CACHE_VERSION = '1';
const CACHE_FILES = [

];

self.addEventListener('install', event => {
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});

self.addEventListener('activate', event => {
});
