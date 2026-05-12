# simple-select — Design (iOS)

## Anatomie

<notes>

1. **Label :** Le label du champ doit indiquer quel type d'information le champ requiert.
2. **Champ de saisie :** l’utilisateur y clique pour ouvrir l’écran de sélection.
3. **Tout effacer :** La croix efface tout dans le champ de saisie. Elle n'apparaît que lorsqu’une option au moins a été sélectionnée.
4. **Écran de sélection (Select Sheet) :** L’écran de sélection contient la liste de toutes les options sélectionnables.

</notes>

---

## Options

### Regroupement d'options

Les options sélectionnables peuvent être regroupées en catégories. Un titre vient alors se positionner en en-tête de la catégorie.

Au scroll, le titre reste fixé en dessous de la *Toolbar* jusqu’à ce qu’il soit remplacé par la catégorie suivante.

### Bouton d'ajout d'option

Lorsque la création est une action fréquente, l'option d’ajout est affichée en permanence en haut à droite de l’écran.

L'utilisateur a la possibilité d'ajouter une nouvelle option après avoir saisi une recherche, si celle-ci n’a donné aucun résultat.

---

## Comportement

### Recherche

La recherche se fait depuis la barre de recherche en haut de l’écran de sélection. Les résultats sont mis à jour en temps réel lors de la saisie au clavier.

Il est possible de quitter le contexte de recherche en appuyant sur le bouton “Annuler” à côté de la barre de recherche.

### État vide

Le contenu de l’écran de sélection se transforme en *empty state* lorsqu'il n'existe aucune option disponible ou qu'une recherche ne donne aucun résultat. Le message doit être adapté pour chacun de ces cas.

Cet état peut être cumulé avec l'ajout d'options. C'est notamment pratique pour pouvoir créer une nouvelle donnée directement via une Fullscreen Sheet.

---

## Règles d'utilisation

### Écran de sélection ou Menu

L’écran de sélection est idéal pour afficher un nombre important d'options.

Lorsque le *Select* permet de sélectionner un faible nombre d'options (entre 3 et 8), il est recommandé de les afficher dans un *Menu* natif.

- **Do** : Le Menu permet un accès rapide aux options, sans perdre le contexte.

### Hauteur de l’écran de sélection

L’écran de sélection utilise le layout *Fullscreen Sheet*. Il prend donc toute la hauteur de l’écran, peu importe le nombre de valeurs présentes dans le *Select*.

- **Don't** : La Bottom Sheet n’est pas optimale pour afficher un grand nombre de d'options. Si le Select comporte entre 3 et 8 options, privilégiez l’utilisation d’un Menu natif.

### Orientation du chevron

L’ouverture de l’écran de sélection provoque un changement de page. Le chevron doit donc être orienté vers la droite pour indiquer la présence d’une navigation.
