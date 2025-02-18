const response = await fetch('https://webmob-ui-22-spotlified.herokuapp.com/api/artists')
const artists = await response.json()

const artistList = document.querySelector('.artist-list')

artistList.innerHTML = ''

artists.forEach((artist) => {
  const artistItem = document.createElement('a')

  artistItem.innerHTML = `
      <img src="${artist.image_url}" />
      <div class="artist-list-item-title">${artist.name}</div>
  `
  artistList.append(artistItem)
})
