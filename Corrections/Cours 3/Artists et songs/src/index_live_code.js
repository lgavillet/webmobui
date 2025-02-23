console.log('It works !')


class ArtistList extends HTMLElement {
  connectedCallback() {
   console.warn('je suis inséré ! ')
  }
}
customElements.define("artist-list", ArtistList)

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
