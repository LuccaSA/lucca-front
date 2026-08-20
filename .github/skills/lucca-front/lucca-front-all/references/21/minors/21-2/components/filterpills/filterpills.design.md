# filterpills — Design Guidelines

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/053be4)

# Design

**Mots-clés :**pilule, filtre, filtrage

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

## Options

### Sélection simple et multiple

Dans une **sélection simple**, l’utilisateur choisit une seule option à la fois. En sélection multiple, plusieurs valeurs peuvent être sélectionnées simultanément.

Le champ de saisi et la liste des options ont chacun une hauteur maximale. Au delà de cette hauteur, des barres de défilement apparaissent. 

Comme pour le Select multiple, une option permet d'afficher un "Tout sélectionner" en haut du Popover permettant ainsi à l'utilisateur de sélectionner toutes les options en un clic.

Dans le cas d’une **sélection multiple**, la Filter Pill indique “Label : Valeur” lorsqu’une seule valeur est sélectionnée. À partir de 2 valeurs sélectionnées, le label indique “X valeurs”.

### Sélection de dates et période

La sélection de date simple permet de choisir une date unique, comme une journée spécifique. La sélection de période offre la possibilité de définir une plage de dates, par exemple pour afficher des données entre deux moments précis.

De la même manière que pour une sélection simple, la Filter pill indique “Label : Valeur” lorsqu’une date est sélectionnée.

Pour une sélection de période, il est possible de ne pas afficher le bouton Clear, notamment lorsque la sélection d’une période est obligatoire pour afficher un contenu.

### Choix booléen

Les Filter pills peuvent également représenter un choix booléen, équivalent à une case à cocher, pour activer ou désactiver un filtre spécifique. Ce type d’interaction est utile pour des options binaires, telles que “Afficher uniquement les éléments actifs” ou “Inclure les données archivées”.

### Tri et regroupement

Il est possible d’utiliser une Filter pill pour trier le contenu filtré. Dans ce cas, le label doit indiquer une valeur comme “Trier par”.

Il n’y a pas de champ de recherche dans le Popover.

De la même manière, il est possible d’utiliser une Filter pill pour regrouper les données. Le label doit indiquer une valeur comme “Grouper par”.

## Cas d'usage

Les Filter pills ne peuvent être utilisé en dehors du composant Filter bar. Ce composant permet de filtrer le contenu d’une interface pour en affiner les résultats.

# Content

## Contenu & rédaction

Le label décrit l’objet sur lequel porte le filtre. Il est écrit au singulier, même si une sélection multiple est possible.

Lorsqu’une valeur est sélectionnée, restez concis en répétant uniquement le label. Si plusieurs valeurs sont sélectionnées, utilisez le pluriel et enlevez la majuscule au label.

- **Do** : Le label s'écrit toujours au singulier.
- **Don't** : N'écrivons jamais le label au pluriel, même s'il est possible de sélectionner plusieurs options.
- **Do** : Utilisons le pluriel si plusieurs options sont sélectionnées.
- **Don't** : Ne gardons pas le même label lorsqu'une ou plusieurs valeurs sont sélectionnées.
