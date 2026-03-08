const CACHE_NAME = "moncache"

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request)
        .then(networkResponse => {
          // On ne met en cache que les réponses valides
          if (networkResponse?.status === 200) {
            const responseClone = networkResponse.clone()
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone)
            })
          }
          return networkResponse
        })
        .catch(error => {
          // Si réseau HS et pas de cache, on propage l'erreur
          if (!cachedResponse) {
            throw error
          }
        })

      // SWR = on renvoie le cache tout de suite si dispo,
      // sinon on attend le réseau
      return cachedResponse || fetchPromise
    })
  )
})
