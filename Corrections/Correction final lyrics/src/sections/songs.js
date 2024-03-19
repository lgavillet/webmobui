import {loadSongs, loadSearch, loadSongDetails} from '../api.js'
import {getItem, getItems, setItem, removeItem} from '../local-storage.js'
import playSong from './player.js'


const listSectionTitle = document.querySelector('#list-section h4')
const songList = document.querySelector('.list')

// S'occupe de remplir la liste d'objets "chansons" reçue en paramètres, directement dans le HTML
// en créant les différents éléments 'song-item' et en leur passant les infos nécessaires à l'affichage
//
// Elle se charge également de lier des eventsListeners à nos customs events créés pour l'occasion
const displaySongArray = (songs) => {
  // Vider la liste (variante 2)
  songList.innerHTML = ''

  songs.forEach((song) => {
    const newElement = document.createElement('song-item')
    newElement.setAttribute('href', `#songs-${song.id}`)
    newElement.setAttribute('title', song.title)
    newElement.setAttribute('favorite', !!getItem(song.id)) // Voir plus bas pour '!!'

    // Lorsque l'on clique sur play
    newElement.addEventListener('play_click', () => {
      playSong(song, songs)
    })

    // Lorsque l'on clique sur le coeur, le but est d'inverser l'état en cours
    newElement.addEventListener('favorite_click', () => {
      // Est-ce que ça nous retourne quelque chose (et donc que c'est dans la liste?)
      if(getItem(song.id)) {
        removeItem(song.id)
      } else {
        setItem(song.id, song)
      }

      // On met à jour l'attribute favorite pour déterminer son état
      newElement.setAttribute('favorite', !!getItem(song.id))

      // on aurait aussi pu écrire quelque chose du genre, sans la ligne 37 :
      //
      // if(getItem(song.id)) {
      //   removeItem(song.id)
      //   newElement.setAttribute('favorite', false)
      // } else {
      //   setItem(song.id, song)
      //   newElement.setAttribute('favorite', true)
      // }
    })

    songList.appendChild(newElement)
  })
}
// NB: Pourquoi '!!' ? En gros: ça permet de convertir ce qui suit en booléen true/false.
// Il y a une valeur ? -> C'est true
// Il n'y a pas de valeur (null, undefined, false,...) ? -> C'est false
// Autrement, getItem retourne soit l'objet qu'il retrouve, soit un null, ce qui n'est pas
// très joli d'un point de vue code... voilà :)


// S'occupe d'afficher les chansons d'un artiste, selon son ID.
// Pour cela, on va utiliser loadSongs du fichiers api.js qui lui sait nous retourner
// un tableau de chanson, selon l'id d'un artiste
const displayArtistSongs = async (id) => {
  const songs = await loadSongs(id)

  listSectionTitle.innerHTML = `Artistes > ${songs[0].artist.name}`
  displaySongArray(songs)

  // ou aussi
  //
  // loadSongs(id).then((songs) => {
  //   listSectionTitle.innerHTML = `Artistes > ${songs[0].artist.name}`
  //   displaySongArray(songs)
  // })
}

// S'occupe d'afficher les chansons correspondant à un terme de recherche passé en paramètre
// Pour cela, on va utiliser loadSearch du fichiers api.js qui lui sait nous retourner
// un tableau de chanson, selon un terme donné
const displaySearchSongs = async (recherche) => {
  const songs = await loadSearch(recherche)

  listSectionTitle.innerHTML = `Recherche de "${recherche}"`
  displaySongArray(songs)

  // ou aussi
  //
  // loadSearch(recherche).then((songs) => {
  //   listSectionTitle.innerHTML = `Recherche de "${recherche}"`
  //   displaySongArray(songs)
  // })
}

// S'occupe d'afficher les chansons favorites
// Pour cela, on va utiliser getItems du fichier local-storage.js qui lui sait nous retourner
// un tableau de chanson, stocké dans localStorage
const displayFavoriteSongs = () => {
  const songs = getItems()

  listSectionTitle.innerHTML = `Favoris`
  displaySongArray(songs)
}

// S'occupe d'afficher les paroles d'une chanson correspondant à l'id passé en paramètre
// Pour cela, on va utiliser loadSongDetails du fichiers api.js qui lui sait nous retourner
// un tableau de chanson, selon un terme donné
const displaySongsLyrics = async (id) => {
  const song = await loadSongDetails(id)

  const nomSong = document.querySelector('#lyrics-section h4')
  const nomArtiste = document.querySelector('#lyrics-section h5')
  const lyricsSong = document.querySelector('#lyrics-section p')

  nomSong.innerHTML = song.title
  nomArtiste.innerHTML = song.artist.name
  lyricsSong.innerHTML = song.lyrics

  // ou aussi
  //
  // loadSongDetails(id).then((song) => {
  //   ...
  // })
}

export { displayArtistSongs, displaySearchSongs, displayFavoriteSongs, displaySongsLyrics }
