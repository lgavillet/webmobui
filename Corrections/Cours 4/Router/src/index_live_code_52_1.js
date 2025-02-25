console.log('It works !')

import './elements/artist-cover.js'
import './elements/song-item.js'

import { loadArtists, loadSongs } from './api.js'



// const mesliens = document.querySelectorAll('nav a')

// mesliens.forEach((lien) => {
//   lien.addEventListener('click', (e) => {

//     const hash = e.currentTarget.hash
//     console.warn(hash)

//     document.querySelector('section.active')?.classList.remove('active')

//     document.querySelector(`${hash}-section`)?.classList.add('active')
//   })
// })


const router = () => {
  const hash = window.location.hash || '#home'

  document.querySelector('section.active')?.classList.remove('active')
  document.querySelector(`${hash}-section`)?.classList.add('active')


  if(hashSplit[0] == '#artists' && hashSplit[1])
    // il faut afficher les chansons !!
    loadSongs(hashSplit[1])
  else if(hashSplit[0] == '#artists')
    // il faut afficher les artists !!
    loadArtists()



}

window.addEventListener("hashchange", router)

router()


///// artist


const artists = await loadArtists()

const artistList = document.querySelector('artist-list')

// Enlever le markup d'exemple
artistList.innerHTML = ''

artists.forEach((artist) => {
  const artistItem = document.createElement('artist-cover')
  artistItem.setAttribute('image_url', artist.image_url)
  artistItem.setAttribute('name', artist.name)
  artistList.append(artistItem)
})



///// songs


const theArtist = artists[5]

const songs = await loadSongs(theArtist.id)

const songList = document.querySelector('#list-section .list')
const songListTitle = document.querySelector('#list-section h4')
songListTitle.innerText = `Artistes > ${theArtist.name}`

songList.innerHTML = ''

songs.forEach((song) => {
  const songItem = document.createElement('song-item')
  songItem.setAttribute('audio_url', song.audio_url)
  songItem.setAttribute('title', song.title)
  songItem.setAttribute('favorite', true)
  songList.append(songItem)
})
