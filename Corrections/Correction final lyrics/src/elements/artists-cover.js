class ArtistCover extends HTMLElement {
  connectedCallback() {
    const newContent = document.querySelector('#artist-list-item-template')
    const newElement = newContent.content.cloneNode(true)
    newElement.querySelector('a').href = this.getAttribute('href')
    newElement.querySelector('img').src = this.getAttribute('cover')
    newElement.querySelector('div').innerText = this.getAttribute('name')
    this.replaceChildren(newElement)
  }
}
customElements.define('artist-cover', ArtistCover)
