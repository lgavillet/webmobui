import './elements/artists-cover.js'
import './elements/song-item.js'

import {displaySection, activateLink} from './helpers.js'

import {displayArtists} from './sections/artists.js'
import {displayArtistSongs, displaySearchSongs, displayFavoriteSongs} from './sections/songs.js'

const routeur = () => {
  const hash = window.location.hash || '#home'
  const hashs = hash.split('-')

  // Colorie le lien
  activateLink(hashs[0])

  switch(hashs[0]) {
    case '#home':
      displaySection('home')
    break;

    case '#player':
      displaySection('player')
    break;

    case '#artists':
      // S'il y a un id qui suit, c'est qu'il faut afficher les chansons d'un artiste
      if(hashs[1]) {
        displaySection('list')
        displayArtistSongs(hashs[1])
      }
      else {
        displaySection('artists')
        displayArtists()
      }
    break;

    case '#favorites':
      displaySection('list')
      displayFavoriteSongs()
    break;

    case '#search':
      // On s'attend typiquement à une url du style /#search-marecherche
      // on réutilise donc la deuxième partie de l'url comme terme de recherche
      displaySection('list')
      displaySearchSongs(hashs[1])
    break;
  }
}

// On veut être averti des changements
window.addEventListener('hashchange', routeur)

// on exécute une première fois au chargement de la page pour afficher la bonne section
routeur()

// On déclare le serviceWorker, avec son url (import.meta.url est une notation propre à Parcel)
navigator.serviceWorker.register(new URL('worker.js', import.meta.url))
// ou aussi
// navigator.serviceWorker.register(new URL('workerCacheFetched.js', import.meta.url))
