# Cours 8 - Lyrics
TODO:
- Implémenter les lyrics selon slides du cours

CHANGES:
1. Créer la logique d'affichage:
  A. Commençons par ajouter une fonction dans api.js pour charger les déatils d'une chanson (contenant ses lyrics), basé sur l'endpoint vu ensemble, puis l'exporter (loadSongDetails)
  B. Dans sections/songs.js, importer la méthode depuis l'api et créer une nouvelle méthode qui servira à charger et afficher les détails. Pour ce faire, 1-2 querySelectors pour récupérer les détails à remplacer, un call à la méthode de l'api et ensuite, du remplacement de texte.
  C. Exporter cette méthode et la récupérer dans index.js. Créer ensuite une nouvelle route correspondante à #songs-:id et appeler cette méthode.
2. Créer le lien dans les song-items
  A. Lors de la création d'un song-item, rajouter un attribute pour la création du lien (soit un href complet, soit juste l'id)
  B. Aller dans song-item, lire l'attribut et remplir le href du lien grâce à celui-ci

# Cours 7 - Favoris
TODO:
- Implémenter la liste des favoris en se servant du local storage comme API de stockage

CHANGES:
1. Ajouter un fichier local-storage.js avec les fonctions d'aide proposées dans le cours (pour l'occasion, on se servira de localstorage comme étant un genre de tableau)
2. Subdiviser le problème en deux plus petits problèmes : l'ajout/suppresion et l'affichage
3. Ajout/Suppression :
  A. Dans song-item, créer un nouveau custom event pour nous permettre d'écouter le click sur le bouton favoris. Si pas déjà fait, utiliser un attribut pour mettre à jour l'icone (soit en variant la valeur de l'attribut, soit en ajoutant/supprimant l'attribut)
  B. Dans songs.js, à la création des éléments de la liste, ajouter un listener sur ce nouvel event dans lequel on ajoutera la logique d'ajout suppression. Pour cela, on va se baser sur l'id de la chanson (unique) comme clé dans localstorage
  C. Toujours dans songs.js, mettre à jour l'état initial de l'attribut pour connaitre l'état de l'icône lors de la création de l'élément, en testant si la chanson est présente ou non dans le local storage
4. Affichage:
  A. Créer une nouvelle méthode qui affichera les favoris en les chargeant depuis le localstorage (displayFavoriteSongs)
  B. La récupérer dans index.js et l'appeler dans le 'case' correspondant au sein de notre "routeur"


# Cours 6 - Custom events and search
TODO :
- Implémenter les customs events pour le bouton play de chaque chanson
- Implémenter la recherche en:
   - Se servant de l'input de recherche pour rediriger sur une url du style "#search-moncritèredereche"
   - Adaptant le routeur + api + partie affichage pour afficher les chansons récupérées avec l'endpoint de recherche

CHANGES :
Events:
1. Créer un custom event dans elements/song-item.js. Après la génération du HTML (typiquement dans notre fonction render), créer un listener sur le bouton play qui intercepte l'event
2. Dans cet event click, le prevent-er et le dispatcher plus haut (au niveau de song-item lui-même, via "this")
3. Binder correctement l'event que nous avions initialiment mis dans sections/songs.js en utilisant le nom correct ("play_click" au lieu de "click")
NB: Les noms d'events sont choisis arbitrairement

Search:
1. Générer une URL de recherche bien formée depuis le champ de recherche (exemple: #search-fade)
  A. Créer un listener sur le bouton loupe pour activer/désactiver la classe active de l'input de recherche.
  B. Créer un listener sur l'input pour mettre l'url à jour, basée sur la valeur entrée dans l'input (égal le listener, tant que ça change à un moment donné). Tada!
2. Créer une nouvelle route dans le routeur qui permet de charger des résultats de recherche pour un terme donné, passé en paramètres (le "fade" de "#search-fade")
  A. Commençons par ajouter une fonction dans api.js pour charger les résultats de recherche, basé sur l'endpoint vu ensemble et l'exporter (loadSearch)
  B. Dans sections/songs.js, nous savons déjà charger les chansons d'un artiste sous forme de tableau, puis en afficher le résultat. Pour la recherche, les deux seules différences résident dans le titre de la section et la provenance des données... Le reste est identique
  C. Séparer la méthode displayArtistSongs en deux pour garder une partie "affichage d'un tableau de chansons" et une autre "charger les chansons d'un artiste et appeler la méthode d'affichage"
  D. Exporter cette nouvelle méthode

# Cours 5 - Player
TODO :
Implémenter le player, en réalisant :
- Un event listener au click sur une chanson pour pouvoir lancer la chanson
- Une fonction exposée par le player, servant à lire la chanson en cours. Typiquement : lireChanson(laChanson, leTableauDeChanson)
- Plusieurs fonctions liées au player, comme par exemple précédent/suivant/pause...
- Relier les informations de la chanson dans le DOM au moment de la lecture

CHANGES :
1. Un fichier player.js a été créé dans "sections/" pour y mettre le code du player
2. Exposé une méthode playSong prenant deux arguments, comme proposé plus haut
3. Faire intéragir cette méthode avec les tags HTML, pour entre autre lier l'url au tag audio et le textes aux autres tags HTML. S'en servir également pour garder une référence sur les objets transmis (dans currentSongList and currentSong)
4. Lier la méthode playSong en ajoutant un event listener au click dans sections/songs.js -> Pourquoi ici ? -> C'est là que l'on gère la logique "métier", c'est donc la que l'on décide ce qu'il se passe au clique. Le custom element est juste là pour nous dire ce qui a été cliqué
5. Créer les fonctions next/previous
6. Lier les boutons aux méthodes next/previous et play/pause
7. Ajouter les event listeners au tag audio et à la progress bar pour mettre à jour l'interface en conséquence



# Cours 4 - Router
TODO :
Implémenter la gestion des liens dans l'application, afin de :
- Permettre de se balader dans le menu via les boutons (il faut mettre la class "active" sur la section correspondante et le bouton du menu)
- Gérer correctement les deux sections artists-section et list-section (appelées respectivement par les urls #artists et #artists-:id)
- Modifier artist-cover en conséquence pour permettre de générer proprement le lien correspondant (dans le markup, il y a actuellement un lien dont le href est égal à "#" --> il devra être égal à "#artists-:id" pour faire en sorte que le routeur fonctionne !)


CHANGES :
1. Générer un lien dans artist-cover.js que l'on passe en attribut
2. Implémenter l'event listener hashchange comme vu en cours (première étape, en ajoutant tout dans index.js):
  A. Mettre une gestion des conditions, soit en utilisant une cascade de if, soit en utilisant un switch, pour appeler le code correspondant à l'url demandée. Il y a les conditions suivantes à gérer :
    i.  Liste des artistes qui demande un call à l'api et créer des artist-covers
    ii. Liste des chansons d'un artiste qui demande un call à l'api et créer des song-items

  B. Mettre une logique d'activation/désactivation des sections, afin de supprimer une classe active à celle en cours et d'ajouter une classe active à la section désirée

  C. Mettre une logique d'activation/désactivation des éléments du menu (aussi par class 'active'), comme point B

3. Se render compte que cela fait beaucoup de code et encore plus avec les commentaires.... ---> Fichiers séparés !
  A. Bouger la partie artist dans sections/artists.js
  B. Bouger la partie songs dans sections/songs.js
  C. Bouger la partie logique d'affichage dans helpers.js
