
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
