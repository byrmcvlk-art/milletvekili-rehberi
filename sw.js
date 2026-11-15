/* Milletvekili Rehberi: yüklenebilirlik için hizmet çalışanı. Önce ağ, ağ yoksa son açılan sayfa. */
const C='mv-shell-v1';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||r.mode!=='navigate')return;
  e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put('./',cp)).catch(()=>{});return res}).catch(()=>caches.match('./').then(m=>m||new Response('Çevrimdışı. İnternete bağlanıp yeniden açın.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}}))))});
