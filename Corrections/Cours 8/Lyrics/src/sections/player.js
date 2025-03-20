import formatTimestamp from '../lib/formatTimestamp'

////////// Constantes des différents tags HTML
// Tag audio
const audioPlayer = document.querySelector('#audio-player')

// Song infos
const playerThumbnail = document.querySelector('#player-thumbnail-image')
const playerSongTitle = document.querySelector('#player-infos-song-title')
const playerArtistName = document.querySelector('#player-infos-artist-name')

// Controls
const playerPrev = document.querySelector('#player-control-previous')
const playerNext = document.querySelector('#player-control-next')
const playerPlay = document.querySelector('#player-control-play')
const playerPlayIcon = playerPlay.querySelector('.material-icons') // see what i did there?

// Progress
const playerTimeCurrent = document.querySelector('#player-time-current')
const playerTimeDuration = document.querySelector('#player-time-duration')
const playerProgress = document.querySelector('#player-progress-bar')

// Logo
const logo = document.querySelector('#logo')

////////// Logique

// contiendra la liste des chansons en cours de lecture, afin de pouvoir se déplacer entre les chansons
let currentSongList = []
// La chanson en cours de lecture
let currentSong = null

// Lire une chanson sur laquelle on clique
const playSong = (song, songs) => {
  // On enregistre la chanson en cours de lecture
  currentSong = song

  // si un tableau est transmis, on le met à jour. Cela nous permet d'utiliser juste playSong(song) à l'interne,
  // sans devoir le repasser à chaque fois (depuis previous/next, par exemple)
  if(songs)
    currentSongList = songs

  // On donne l'url au player et démarre la lecture
  audioPlayer.src = song.audio_url
  audioPlayer.play()

  // Remplacement des différentes informations au sein des tags
  playerSongTitle.innerText = song.title
  playerArtistName.innerText = song.artist.name
  playerThumbnail.src = song.artist.image_url
}

// Lis la chanson suivante, d'après la chanson en cours
const playNextSong = () => {
  let newIndex = currentSongList.indexOf(currentSong) + 1
  // On s'assure qu'on n'arrive jamais en dehors du tableau et on reboucle sur le début
  if(newIndex == currentSongList.length)
    newIndex = 0

  playSong(currentSongList[newIndex])
}

// Lis la chanson précédente, d'après la chanson en cours
const playPreviousSong = () => {
  let newIndex = currentSongList.indexOf(currentSong) - 1

  if(newIndex == -1)
    newIndex = currentSongList.length - 1

  playSong(currentSongList[newIndex])
}

// On écoute le clique sur le bouton play et on transmets l'instruction au player
playerPlay.addEventListener('click', () => {
  if(audioPlayer.paused)
    audioPlayer.play()
  else
    audioPlayer.pause()
})

// Bouton précédent
playerPrev.addEventListener('click', playPreviousSong)

// Bouton suivant
playerNext.addEventListener('click', playNextSong)

// Lorsque l'on click sur la barre de progression, on change sa valeur et elle émet donc un événement "change" pour
// avertir de son changement. Comme on a défini la valeur max comme étant la durée totale de la chanson, toute valeur
// transmise est forcément incluse dans cet interval. On peut alors la passer au player sans problème
playerProgress.addEventListener('change', (event) => {
  audioPlayer.currentTime = event.currentTarget.value
})

// Lorsque nous faison ".src = " sur le player, celui-ci va télécharger la chanson en arrière plan et calculer
// sa longueur. Lorsque c'est fait, il émet un event "durationchange" pour nous informer qu'il connait maintenant
// sa durée (en secondes!) et que l'on peut se servir de cette information
audioPlayer.addEventListener('durationchange', () => {
  // On défini la valeur maximum du slider de la chanson comme étant sa durée en secondes
  playerProgress.max = audioPlayer.duration
  // On affiche la durée totale, grâce à la fonction de formattage du temps
  playerTimeDuration.innerText = formatTimestamp(audioPlayer.duration)
})

// Lorsque la chanson est en cours de lecture, l'événement "timeupdate" sera envoyé plusieurs fois par seconde
// pour avertir de l'avancée dans la lecture. C'est cet événement qui nous permet de bouger la barre de progression
// au fur et à mesure que la chanson se lit.
audioPlayer.addEventListener('timeupdate', () => {
  // On récupère la valeur "currentTime" qui est la position dans la chanson au sein du player et on la transmets
  // à la progress bar comme étant sa valeur. La progress bar a comme valeur minimum 0 et comme valeur max la durée
  // totale de la chanson. En lui passant le currrentTime, il sera forcément entre le min et le max et le browser
  // pourra afficher la petite boule au bon endroit
  playerProgress.value = audioPlayer.currentTime
  // On affiche la position de lecture, grâce à la fonction de formattage du temps
  playerTimeCurrent.innerText = formatTimestamp(audioPlayer.currentTime)
})

// Lorsque le player se met en lecture, il émet un évent "play" pour annoncer le début de lecture. Dans ce cas,
// on change l'icône du bouton play à pause
//
// Pourquoi faire ça ici et non dans le "click" sur le bouton ? :) Que se passe-t-il si vous utilisez le bouton
// "play/pause" natif qui se trouve sur votre clavier ? Cela va mettre en pause la chanson, mais l'événement "click"
// du bouton play/pause ne sera pas émis, donc icône pas mis à jour, car vous avez utilisez votre clavier et
// non le bouton.
// En revanche, lorsque votre OS reçoit le click sur le clavier, il trouve l'application qui émet du son (en l'occ.
// notre browser) et lui demande d'arrêter. Le browser va chercher quel élément audio lis actuellement de la musique
// et va faire un "audioPlayer.pause()". Les évenements play/pause seront donc transmis et c'est pour cela qu'il est
// mieux de gérer le changement d'icône ici
audioPlayer.addEventListener('play', () => {
  playerPlayIcon.innerText = 'pause'

  // On anime le logo de l'application lorsqu'une chanson se lit, pour plus de fancyness
  logo.classList.add('animated')
})

// Lorsque le player pause la lecture, il émet un évent "pause" pour annoncer le pause de lecture. Dans ce cas,
// on change l'icône du bouton pause à play
// voir commentaire précédent
audioPlayer.addEventListener('pause', () => {
  playerPlayIcon.innerText = 'play_arrow'

  // On arrête d'animer le logo de l'application lorsqu'aucune chanson ne se lit, pour moins de fancyness
 logo.classList.remove('animated')
})

export default playSong
