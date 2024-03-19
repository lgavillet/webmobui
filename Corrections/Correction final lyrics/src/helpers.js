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

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Partie recherche, coté UI
const searchButton = document.querySelector('#search-trigger')
const searchInput = document.querySelector('#search-input')

// Dès que l'on click sur le bouton de recherche, cela cache ou affiche le champ de recherche en
// ajoutant ou supprimant la classe "active"
searchButton.addEventListener('click', () => {
  if(searchInput.classList.contains('active'))
    searchInput.classList.remove('active')
  else
    searchInput.classList.add('active')
})

// Dès qu'il y a un input qui est fait du coté utilisateur, on reprend cette valeur
// et on redirige vers une url du style: /#search-marecherche
//
// NB: encodeURIComponent permet de transformer tous les caractères spéciaux (comme les / par exemple)
// en caractère codé pour éviter d'induire le navigateur en erreur. Il sait alors que le / est un / de texte
// et non une partie de l'url
searchInput.addEventListener('input', () => {
  window.location.hash = `#search-${encodeURIComponent(searchInput.value)}`
})

export {displaySection, activateLink}
