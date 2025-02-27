import { loadArtists } from '../api.js'

// Récupérer le tag contenant la liste d'artistes
const artistList = document.querySelector('artist-list')

// S'occupe de charger des artistes via les fonctions de l'api et de remplir
// la liste d'objets "artistes", directement dans le HTML en créant les différents éléments
// 'artist-cover' et en leur passant les infos nécessaires à l'affichage

const displayArtists = async () => {

  // Vider la liste
  artistList.innerHTML = ''

  // Récupérer la liste d'artistes depuis l'api
  const artists = await loadArtists()

  // Itérer le tableau d'artistes reçus et créer les éléments correspondants
  artists.forEach((artist) => {
    // Créer l'élément
    const artistItem = document.createElement('artist-cover')

    // Mettre les attributs
    artistItem.setAttribute('image_url', artist.image_url)
    artistItem.setAttribute('name', artist.name)
    artistItem.setAttribute('href', `#artists-${artist.id}`)

    // Insérer dans la liste
    artistList.append(artistItem)
  })
}

export { displayArtists }
