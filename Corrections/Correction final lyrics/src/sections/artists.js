import {loadArtists} from '../api.js'

// Elements
const artistList = document.querySelector('.artist-list')

// S'occupe de charger des artistes via les fonctions de l'api et de remplir
// la liste d'objets "artistes", directement dans le HTML en créant les différents éléments
// 'artist-cover' et en leur passant les infos nécessaires à l'affichage

const displayArtists = () => loadArtists().then((artists) => {
    // Vider la liste (variante 1)
  artistList.replaceChildren()

  artists.forEach((artist) => {
    const newElement = document.createElement('artist-cover')
    newElement.setAttribute('href', `#artists-${artist.id}`)
    newElement.setAttribute('name', artist.name)
    newElement.setAttribute('cover', artist.image_url)
    artistList.appendChild(newElement)
  })
})

export {displayArtists}
