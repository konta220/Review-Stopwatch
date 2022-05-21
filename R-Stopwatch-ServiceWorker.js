'use strict';

// 作成日: 2018/10/27
const CashVersion = '202205211602';

const CashFiles = [
    // CDN
    'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js',
    'https://stackpath.bootstrapcdn.com/bootswatch/4.1.3/darkly/bootstrap.min.css',

    // github.io
    'https://pages-themes.github.io/slate/assets/images/blacktocat.png',

    // Site Source
    './src/app.js',
    './src/style.css',
    './',
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CashVersion).then(function (cache) {
            return cache.addAll(CashFiles).then(function () {
                self.skipWaiting();
            });
        })
    );
});

self.addEventListener('activate', function (event) {
    console.log('Service Worker activate');
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // キャッシュがあったなら、そのレスポンスを返す
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});
