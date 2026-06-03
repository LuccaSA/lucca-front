# plg-push — Design

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
