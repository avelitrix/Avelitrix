const CACHE_NAME='avelitrix-launcher-v2';
const APP_ASSETS=['./','./index.html','./manifest.webmanifest','./service-worker.js','./assets/icons/icon-192.png','./assets/icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const copy=n.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,copy));return n;}).catch(()=>caches.match('./index.html'))));});
