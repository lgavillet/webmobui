import {loadArtists} from '../api.js'

// Elements
const artistList = document.querySelector('.artist-list')

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
