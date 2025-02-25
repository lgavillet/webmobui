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
