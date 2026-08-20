# plg-push — Design Guidelines

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/6035eb)

# Design

#### Des questions, commentaires ou retours ?

Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

## Options

### Publicité effaçable

Dans certains cas, il doit être possible pour l’utilisateur de supprimer la communication PLG. Une option permet d’afficher une croix à droite du composant, pour indiquer le rejet.

#### Règles de réapparition

* **Le rejet explicite (clic sur la croix) :** si l'utilisateur efface le composant, il indique un désintérêt. Ce choix est respecté et entraînera un « cool-down » progressif avant une nouvelle apparition du PLG Push:
    * 1re fermeture : réapparition après 14 jours.
    * 2e fermeture : réapparition après 60 jours.
* **La complétion :** si l'utilisateur clique sur le lien, le PLG Push ne doit plus jamais apparaître pour cette fonctionnalité spécifique.

## Règles d'utilisation

### Les couleurs Lucca

Le format “message publicitaire” doit être reconnaissable, quel que soit le logiciel dans lequel elle se trouve.

De ce fait, elle porte la couleur orange, couleur principale de Lucca. Elle ne doit pas être changée, ni par la couleur du logiciel dans lequel se trouve la publicité, ni par la couleur du logiciel mis en avant.

- **Do** : Utilisons la palette de couleur Brand.
- **Don't** : N'appliquons pas les palettes Product.

### Une icône définie

L’icône de fusée est utilisée comme marqueur des communications PLG. Il est interdit de changer cette icône pour une autre, pour maintenir une cohérence entre toutes ces communications et le Store Lucca.

- **Do** : Nous utilisons l'icône de fusée pour toutes les communications PLG.
- **Don't** : Ne modifions pas l'icône pour l'adapter au message. Cela nuit à la compréhension du message.

### Communications multiples sur une même interface

Il n’est pas conseillé d’utiliser plusieurs publicités sur une même interface. Cela peut-être perçu comme du spam par l’utilisateur.

De la même manière, il n’est pas possible de communiquer sur plusieurs logiciels dans une même publicité.

# Content

## Contenu et rédaction

### Nous évitons l'usage du titre

Souvent, il n’apporte pas plus d’information qu’une simple description, notamment lorsqu’il s’agit de mettre en avant des fonctionnalités d’un logiciel.

- **Do** : Privilégions une phrase d'accroche unique, complète et descriptive qui remplace le titre et transmet immédiatement la valeur et l'action principale.
- **Caution** : Évitons de séparer le message en utilisant une question rhétorique ou un titre suivi d'une phrase d'action. Cela crée une étape intermédiaire inutile pour l'utilisateur.

### Un message clair et marquant

Le message doit donner une information utile pour l’utilisateur, éveiller sa curiosité sur un bénéfice concret apporté par le logiciel.

* Accompagner d’une information, d’un fait chiffré ? Préférons cela à une liste de fonctionnalités ou à un message sans information précise, ni tangible.
* Vérifier que l’information donnée dans la publicité est claire, compréhensible dès la 1re lecture, et facilement trouvable dans la fiche produit à laquelle elle donne accès.
* Utiliser la voix active et le présent de l’indicatif.
* Pas de superlatif, de tonalité sur-enthousiaste, d’humour, de référence culturelle ou d’émoji.
* Vouvoyer l’utilisateur.
* Un point à la fin de la phrase.
* Pas d’italique ou de souligné (hors lien hypertexte), qui compliquent la lecture.

- **Do** : Délivrons un message unique, utile et concret (si possible chiffré) en utilisant la voix active et le présent de l'indicatif,
- **Don't** : Bannissons les superlatifs, l'humour, les références culturelles, les émojis, l'italique et le souligné, et éviter les listes de fonctionnalités ou les informations non tangibles

### Lien de redirection

Pour une lecture plus fluide, le lien de redirection est indiqué après la description. L’intitulé indique de manière claire à l’utilisateur ce qu’il se passe s’il clique dessus.

* Le texte doit être concis. Utilisons des **verbes d’action à l’infinitif** simples et clairs. Évitons le jargon ou terme issu du métier.
* Le lien doit tenir sur une seule ligne. Si le lien, situé en bout de ligne, est trop long, alors il est affiché sur une ligne en-dessous.
* Pas de point à la fin du lien.
* Le lien doit porter l’icône “arrow-external” pour indiquer à l’utilisateur qu’il sort de son flux de travail. Le lien doit ouvrir un nouvel onglet pour que l’utilisateur puisse le consulter à postériori.
* Le lien doit renvoyer vers la page produit du Store Lucca. C’est cette page produit qui permettra à l’utilisateur d’avoir une présentation du produit et de faire un essai gratuit. Cette page s’ouvre dans un nouvel onglet.

Vous pouvez vous référer à la guideline sur les liens pour en savoir plus sur les règles générales de rédactions.

- **Do** : Utilisons des espaces insécables entre les mots dans le lien. Cela permet de de ne pas couper le lien sur plusieurs lignes.
- **Don't** : Hors cas spécifiques, comme dans un espace très restreint, un lien ne doit pas être coupé sur deux lignes.
- **Don't** : Un lien doit toujours porter l'icône "arrow-external" car il ouvre un nouvel onglet.
- **Don't** : N'utilisons pas un texte de lien générique et peu informatif comme "Cliquez-ici".
