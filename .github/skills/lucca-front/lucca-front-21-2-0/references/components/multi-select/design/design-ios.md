# multi-select — Design (iOS)

## Anatomie

## Options

### Bouton d'ajout d'option

Lorsque la création est une action fréquente, l'option d’ajout est affichée en permanence en haut à droite de l’écran.

L'utilisateur a la possibilité d'ajouter une nouvelle option après avoir saisi une recherche, si celle-ci n’a donné aucun résultat.

## Comportement

### Recherche

La recherche se fait depuis la barre de recherche en haut de l’écran de sélection. Les résultats sont mis à jour en temps réel lors de la saisie au clavier.

Lorsque l’utilisateur sélectionne une option, il reste dans le contexte de recherche. Il est possible de quitter la recherche en appuyant sur le bouton “Annuler” à côté de la barre de recherche.

### État vide

Le contenu de l’écran de sélection se transforme en *empty state* lorsqu'il n'existe aucune donnée disponible ou qu'une recherche ne donne aucun résultat. Le message doit être adapté pour chacun de ces cas.

Cet état peut être cumulé avec l'ajout de option. C'est notamment pratique pour pouvoir créer une nouvelle donnée directement via une Fullscreen Sheet.

### Nombre d'options sélectionnées

Le nombre d’options sélectionnées est affiché dans un compteur à côté du bouton de validation.

Si aucune option n’est sélectionnée, le compteur n’est pas affiché.

### Affichage des résultats

Les options sélectionnées s’affichent avec le composant Chip à l’intérieur du Select, sur une seule ligne. Un effet de débordement est présent si les résultats dépassent de la largeur du Select.

Il est possible de voir les options suivantes à l’aide du swipe.

## Règles d'utilisation

### Résumé de sélection

N’affichons pas les options sélectionnées depuis l’écran de sélection : elles minimisent la zone d’affichage et rendent la lecture de l’écran plus difficile.

Privilégions l’affichage des options depuis l’Input seulement.

- **Do** : Les options peuvent être consultées après la validation en utilisant le format Chip.
- **Don't** : Le nombre d'options visibles à l’écran est drastiquement réduit lorsque les options sélectionnées sont affichées au dessus du bouton de sélection.

### Orientation du chevron

L’ouverture de l’écran de sélection provoque un changement de page. Le chevron doit donc être orienté vers la droite pour indiquer la présence d’une navigation.
