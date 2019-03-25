importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/3cf5b3fee67fe9ee4582.js",
    "revision": "8315c0926db640da9568c62c7a00448c"
  },
  {
    "url": "/_nuxt/884505aafefd866d2868.js",
    "revision": "9f62b8fbc6d878a30c2e69884f28f37a"
  },
  {
    "url": "/_nuxt/c5aef30acf57736996c2.js",
    "revision": "491b0bfa48991d5a814db2276d43a847"
  },
  {
    "url": "/_nuxt/c78d0ae7f0e27e2e1bdd.js",
    "revision": "1c7f34453eff703443181159328a12b8"
  },
  {
    "url": "/_nuxt/cfce3eb2d7c2dfdaf7f1.js",
    "revision": "ee854f26b30ad35bb5ec74a4d2f57ce0"
  },
  {
    "url": "/_nuxt/e03f77b1050eab67dd04.js",
    "revision": "eee7f39f95d56fce2f6fbff72c8a8b51"
  },
  {
    "url": "/_nuxt/f61777c4e4d958981b4b.js",
    "revision": "59fadaaea0e34c29ea80f183c624d9ec"
  }
], {
  "cacheId": "test",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
