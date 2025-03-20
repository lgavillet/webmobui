import { loadSongs, loadSearch, loadSongDetails } from '../api.js'
import playSong from './player.js'
import {getItem, getItems, setItem, removeItem} from '../local-storage.js'

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

    songItem.setAttribute('href', `#songs-${song.id}`)
    songItem.setAttribute('title', song.title)
    songItem.setAttribute('favorite', !!getItem(song.id))

    // NB: Pourquoi '!!' ? En gros: ça permet de convertir ce qui suit en booléen true/false.
    // Il y a une valeur ? -> C'est true
    // Il n'y a pas de valeur (null, undefined, false,...) ? -> C'est false
    // Autrement, getItem retourne soit l'objet qu'il retrouve, soit un null, ce qui n'est pas
    // très joli d'un point de vue code... voilà :)

    // Lorsque l'on clique sur play
    songItem.addEventListener('play_click', () => {
      playSong(song, songs)
    })

    // Lorsque l'on clique sur le coeur, le but est d'inverser l'état en cours
    songItem.addEventListener('favorite_click', () => {
      // Est-ce que ça nous retourne quelque chose (et donc que c'est dans la liste?)
      if(getItem(song.id)) {
        removeItem(song.id)
      } else {
        setItem(song.id, song)
      }

      // On met à jour l'attribute favorite pour déterminer son état
      songItem.setAttribute('favorite', !!getItem(song.id))
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

// S'occupe d'afficher les chansons favorites
// Pour cela, on va utiliser getItems du fichier local-storage.js qui lui sait nous retourner
// un tableau de chanson, stocké dans localStorage
const displayFavoriteSongs = () => {
  const songs = getItems()

  titreList.innerHTML = `Favoris`
  displaySongArray(songs)
}


const songTitle = document.querySelector('#lyrics-section h4')
const artistName = document.querySelector('#lyrics-section h5')
const songLyrics = document.querySelector('#lyrics-section p')

// S'occupe d'afficher les paroles d'une chanson correspondant à l'id passé en paramètre
// Pour cela, on va utiliser loadSongDetails du fichiers api.js qui lui sait nous retourner
// un tableau de chanson, selon un terme donné
const displaySongsLyrics = async (id) => {
  const song = await loadSongDetails(id)

  songTitle.innerHTML = song.title
  artistName.innerHTML = song.artist.name
  songLyrics.innerHTML = song.lyrics
}

export { displayArtistSongs, displaySearchSongs, displayFavoriteSongs, displaySongsLyrics }
