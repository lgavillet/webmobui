// Cache la section en cours et affiche celle correspondant à l'id passé en paramètre
const displaySection = (id) => {
  // On essaie de trouver la section active et on enlève la classe "active"
  // Hint: Comment gérer le cas où on ne trouve rien ?
  document.querySelector('section.active')?.classList.remove('active')

  // On essaie de trouver la section qui correspond à l'id passé
  document.querySelector(`${id}-section`)?.classList.add('active')
}

const activateLink = (id) => {
  // Same same, avec les liens
  document.querySelector(`nav a.active`)?.classList.remove('active')
  document.querySelector(`nav a[href="${id}"]`)?.classList.add('active')
}

export {displaySection, activateLink}
