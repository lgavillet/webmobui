class ArtistCover extends HTMLElement {
  // Appelé lorsque que l'on insert l'élément dans le DOM, typiquement au moment de:
  // artistList.appendChild(newElement)
  connectedCallback() {
    this.innerHTML = `
      <a href="${this.getAttribute('href')}">
        <img src="${this.getAttribute('image_url')}" />
        <div class="artist-list-item-title">${this.getAttribute('name')}</div>
      </a>
    `
  }
}

// Déclare le tag du custom element et la classe à utiliser pour le créer dans le DOM
// Pas besoin d'exporter, juste d'être appelé une fois
customElements.define("artist-cover", ArtistCover)
