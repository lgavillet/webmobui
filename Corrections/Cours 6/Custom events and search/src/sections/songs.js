import { loadSongs, loadSearch } from '../api.js'
import playSong from './player.js'

// Récupérer le tag contenant la liste des chansons et le titre de la section
const songList = document.querySelector('.list')
const titreList = document.querySelector('#list-section h4')


// S'occupe de remplir la liste d'objets "chansons" reçue en paramètres, directement dans le HTML
// en créant les différents éléments 'song-item' et en leur passant les infos nécessaires à l'affichage
//
// Elle se charge également de lier des eventsListeners à nos customs events créés pour l'occasion
const displaySongArray = (songs) => {
  // Vider la liste
  songList.innerHTML = ''

  // Itérer le tableau d'artistes reçus et créer les éléments correspondants
  songs.forEach((song) => {
    // Créer l'élément
    const songItem = document.createElement('song-item')

    songItem.setAttribute('title', song.title)
    songItem.setAttribute('favorite', false) // ou true, pour plus tard

    // Lorsque l'on clique sur play
    songItem.addEventListener('play_click', () => {
      playSong(song, songs)
    })

    // Insérer dans la liste
    songList.appendChild(songItem)
  })
}

// S'occupe d'afficher les chansons d'un artiste, selon son ID.
// Pour cela, on va utiliser loadSongs du fichiers api.js qui lui sait nous retourner
// un tableau de chanson, selon l'id d'un artiste
const displayArtistSongs = async (id) => {
  // Récupérer la liste des chansons depuis l'api
  const songs = await loadSongs(id)

  // Titre à jour
  titreList.innerHTML = `Artistes > ${songs[0].artist.name}`

  displaySongArray(songs)
}

// S'occupe d'afficher les chansons d'un artiste, selon son ID.
// Pour cela, on va utiliser loadSongs du fichiers api.js qui lui sait nous retourner
// un tableau de chanson, selon l'id d'un artiste
const displaySearchSongs = async (query) => {
  // Récupérer la liste des chansons depuis l'api
  const songs = await loadSearch(query)

  // Titre à jour
  titreList.innerHTML = `Résultats de recherche pour : ${decodeURIComponent(query)}`

  displaySongArray(songs)
}


export { displayArtistSongs, displaySearchSongs }
