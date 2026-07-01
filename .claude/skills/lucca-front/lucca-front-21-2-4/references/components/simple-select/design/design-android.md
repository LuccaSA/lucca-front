# simple-select — Design (Android)

## Anatomie

## Options

### Regroupement des options

Les options sélectionnables peuvent être regroupées en sous-catégories. Pour indiquer cela, un titre vient se positionner en en-tête de la sous-catégorie.

Au scroll, le titre reste fixé en dessous de la *Top App Bar* jusqu’à ce qu’il soit remplacé par la catégorie suivante.

### Bouton d'ajout d'options

Lorsque la création est une action fréquente, l'option d’ajout est affichée en permanence en haut à droite de l’écran.

L'utilisateur a la possibilité d'ajouter une nouvelle option après avoir saisi une recherche, si celle-ci n’a donné aucun résultat.

## Comportement

### Recherche

La recherche se fait depuis la barre de recherche en haut de l’écran de sélection. Les résultats sont mis à jour en temps réel lors de la saisie au clavier.

Il est possible de quitter le contexte de recherche en appuyant sur le bouton *Clear* dans la barre de recherche.

### État vide

Le contenu de l’écran de sélection se transforme en *empty state* lorsqu'il n'existe aucune option disponible ou qu'une recherche ne donne aucun résultat. Le message doit être adapté pour chacun de ces cas.

Cet état peut être cumulé avec l'ajout d'options. C'est notamment pratique pour pouvoir créer une nouvelle donnée directement via une Fullscreen Cover.

## Règles d'utilisation

### Positionnement du label

Sur Android, le label est positionné à l’intérieur du champ de sélection. Ce choix est fait pour respecter les spécifications de **[Material Design](https://m3.material.io/components/text-fields/specs#6d654d1d-262e-4697-858c-9a75e8e7c81d)** sur les champs de formulaire.

- **Do** : Le label à l’intérieur du champ permet de maximiser la zone de touche.

### Écran de sélection ou Menu

L’écran de sélection est idéal pour afficher un nombre important d'options.

Lorsque le *Select* permet de sélectionner un faible nombre d'options (entre 3 et 8), il est recommandé de les afficher dans un *Menu* natif.

- **Do** : Le Menu permet un accès rapide aux valeurs, sans perdre le contexte.

### Hauteur de l’écran de sélection

L’écran de sélection utilise le layout *Fullscreen Cover*. Il prend donc toute la hauteur de l’écran, peu importe le nombre d'options présentes dans le *Select*.

- **Don't** : La Bottom Sheet n’est pas optimale pour afficher un grand nombre d'options. Si le Select comporte entre 3 et 8 options, privilégiez l’utilisation d’un Menu natif.

### Orientation du chevron

L’ouverture de l’écran de sélection provoque un changement de page. Le chevron doit donc être orienté vers la droite pour indiquer la présence d’une navigation.
