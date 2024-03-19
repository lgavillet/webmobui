class ArtistCover extends HTMLElement {

  // Appelé lorsque que l'on insert l'élément dans le DOM, typiquement au moment de:
  // songList.appendChild(newElement)
  connectedCallback() {
    // Version avec un tag <template> au lieu de stocker le HTML dans le code JS
    const newContent = document.querySelector('#artist-list-item-template')
    const newElement = newContent.content.cloneNode(true)
    newElement.querySelector('a').href = this.getAttribute('href')
    newElement.querySelector('img').src = this.getAttribute('cover')
    newElement.querySelector('div').innerText = this.getAttribute('name')
    this.replaceChildren(newElement)
  }
}

// Déclare le tag du custom element et la classe à utiliser pour le créer dans le DOM
customElements.define('artist-cover', ArtistCover)
