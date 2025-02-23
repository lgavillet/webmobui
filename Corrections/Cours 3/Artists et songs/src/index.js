import './elements/artist-cover'
import './elements/song-item'
import { loadArtists, loadSongs } from './api'

///// Artists

// Récupérer le tag contenant la liste d'artistes
const artistList = document.querySelector('artist-list')

// Enlever le markup d'exemple
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

  // Insérer dans la liste
  artistList.append(artistItem)
})


///// Songs

// Récupérer le tag contenant la liste des chansons
const songList = document.querySelector('.list')
const titreList = document.querySelector('#list-section h4')
// Enlever le markup d'exemple
songList.innerHTML = ''

// Récupérer la liste des chansons depuis l'api (bête exemple en premier le premier artiste)
const premierArtiste = artists[0]
const songs = await loadSongs(premierArtiste.id)

// Titre à jour
titreList.innerHTML = `Artistes > ${premierArtiste.name}`

// Itérer le tableau d'artistes reçus et créer les éléments correspondants
songs.forEach((song) => {
  // Créer l'élément
  const songItem = document.createElement('song-item')

  // Mettre les attributs
  songItem.setAttribute('title', song.title)
  songItem.setAttribute('audio_url', song.audio_url)
  songItem.setAttribute('favorite', false)

  // Insérer dans la liste
  songList.append(songItem)
})
