import { loadSongs } from '../api.js'
import playSong from './player.js'

// Récupérer le tag contenant la liste des chansons et le titre de la section
const songList = document.querySelector('.list')
const titreList = document.querySelector('#list-section h4')

// S'occupe d'afficher les chansons d'un artiste, selon son ID.
// Pour cela, on va utiliser loadSongs du fichiers api.js qui lui sait nous retourner
// un tableau de chanson, selon l'id d'un artiste
const displayArtistSongs = async (id) => {
  // Récupérer la liste des chansons depuis l'api
  const songs = await loadSongs(id)

  // Titre à jour
  titreList.innerHTML = `Artistes > ${songs[0].artist.name}`

  // Vider la liste
  songList.innerHTML = ''

// Itérer le tableau d'artistes reçus et créer les éléments correspondants
  songs.forEach((song) => {
    // Créer l'élément
    const songItem = document.createElement('song-item')

    songItem.setAttribute('title', song.title)
    songItem.setAttribute('favorite', false) // ou true, pour plus tard

    // Lorsque l'on clique sur l'élément (on reparlera bientôt des events listeners
    // au sein des custom events plus en détail)
    songItem.addEventListener('click', (e) => {
      e.preventDefault()
      playSong(song, songs)
    })

    // Insérer dans la liste
    songList.appendChild(songItem)
  })
}

export { displayArtistSongs }
