

class ArtistList extends HTMLElement {
  connectedCallback() {
   console.warn('je suis inséré ! ')
  }
}
customElements.define("artist-list", ArtistList)
