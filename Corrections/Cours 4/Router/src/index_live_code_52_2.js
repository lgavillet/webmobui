console.log('It works !')


class ArtistCover extends HTMLElement {
  static observedAttributes = ['image_url', 'name']

  render() {
    this.innerHTML = `
      <a href="#">
        <img src="${this.getAttribute('image_url')}" />
        <div class="artist-list-item-title">${this.getAttribute('name')}</div>
      </a>
    `
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }
}
customElements.define("artist-cover", ArtistCover)


class SongItem extends HTMLElement {

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const icon = this.getAttribute('favorite') ? 'favorite' : 'favorite_border'
    this.innerHTML = `
      <a href="#">
        <div class="list-item-title">${this.getAttribute('title')}</div>
        <div class="list-item-actions">
          <button type="button" class="icon-button favorite-button ">
            <span class="material-icons">${icon}</span>
          </button>
          <button type="button" class="icon-button play-button">
            <span class="material-icons">play_arrow</span>
          </button>
        </div>
      </a>
    `
  }
}
customElements.define("song-item", SongItem)








const songList = document.querySelector('#list-section .list')

// Enlever le markup d'exemple
songList.innerHTML = ''

const titre = document.querySelector('#list-section h4')


const id = 2
const responseSong = await fetch(`https://webmob-ui-22-spotlified.herokuapp.com/api/artists/${id}/songs`)
const songs = await responseSong.json()

titre.innerText = `Artistes > ${songs[0].artist.name}`
songs.forEach((song) => {
  const songItem = document.createElement('song-item')
  songItem.setAttribute('title', song.title)

  songList.append(songItem)
})



const routeur = async () => {
  const hash = window.location.hash || '#home'

  const hashSplit = hash.split('-')

  console.warn(hashSplit )


  // GET #artists-:id
  if(hashSplit[0] == '#artists' && hashSplit[1]){
    console.warn('faut charger les chansons de ', hashSplit[1])

  // GET #artists
  } else  if(hashSplit[0] == '#artists') {
    const response = await fetch('https://webmob-ui-22-spotlified.herokuapp.com/api/artists')
    const artists = await response.json()

    const artistList = document.querySelector('artist-list')

    // Enlever le markup d'exemple
    artistList.innerHTML = ''

    artists.forEach((artist) => {
      const artistItem = document.createElement('artist-cover')
      artistItem.setAttribute('image_url', artist.image_url)
      artistItem.setAttribute('name', artist.name)
      artistList.append(artistItem)
    })
  }
  else {
  }
  return




  document.querySelectorAll('section').forEach((section) => section.classList.remove('active'))
  document.querySelector(`${hash}-section`).classList.add('active')



}


window.addEventListener("hashchange", routeur)


routeur()
