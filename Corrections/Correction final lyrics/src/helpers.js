// Cache la section en cours et affiche celle correspondant à l'id passé en paramètre
const displaySection = (id) => {
  // On essaie de trouver la section active et on enlève la classe "active"
  // Hint: Comment gérer le cas où on ne trouve rien ?
  const activeSection = document.querySelector('section.active')
  if(activeSection)
    activeSection.classList.remove('active')

  // ou sur une ligne:
  // document.querySelector('section.active')?.classList.remove('active')

  // On essaie de trouver la section qui correspond à l'id passé
  const newSection = document.querySelector(`#${id}-section`)
  if(newSection)
    newSection.classList.add('active')

  // ou sur une ligne:
  // document.querySelector(`#${id}-section`)?.classList.add('active')
}

const activateLink = (id) => {
  // Same same, avec les liens
  const activeLink = document.querySelector(`nav a.active`)
  if(activeLink)
    activeLink.classList.remove('active')

  // ou sur une ligne:
  // document.querySelector(`nav a.active`)?.classList.remove('active')

  const link = document.querySelector(`nav a[href="${id}"]`)
  if(link)
    link.classList.add('active')

  // ou sur une ligne:
  // document.querySelector(`nav a[href="${id}"]`)?.classList.add('active')
}


// Helpers pour l'affichage de la recherche
const searchButton = document.querySelector('#search-trigger')
const searchInput = document.querySelector('#search-input')


searchButton.addEventListener('click', () => {
  searchInput.classList.add('active')
})

searchInput.addEventListener('input', (e) => {
  window.location.hash = `#search-${encodeURIComponent(searchInput.value)}`
})

export {displaySection, activateLink}
