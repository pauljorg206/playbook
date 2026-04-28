const CACHE = "playbook-v2";
const PRECACHE = [
  "/",
  "/plays/offense/one-four-high",
  "/roster",
  "/practice",
  "/manifest.json",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// Network-first for HTML/page navigations so the playbook always shows the latest plays.
// Cache-first for static assets so the app still loads offline at the gym.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  const isPage =
    e.request.mode === "navigate" ||
    e.request.headers.get("accept")?.includes("text/html");

  if (isPage) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
          return res;
        })
        .catch(() =>
          caches.match(e.request).then((cached) => cached || caches.match("/")),
        ),
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request)
        .then((res) => {
          if (!res || res.status !== 200 || res.type === "opaque") return res;
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match("/"));
    }),
  );
});
