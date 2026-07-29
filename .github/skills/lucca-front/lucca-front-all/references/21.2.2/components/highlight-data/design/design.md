# highlight-data — Design

**Mots-clés :**données, KPI, chiffres, valeurs

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

☝️ Si vous souhaitez en savoir plus sur son utilisation au sein d’une interface, son positionnement et les spécifications Design, rendez-vous en bas de cette page.

## Options

### Thèmes

Plusieurs thèmes existent pour que le composant puisse s’utiliser sur différentes couleurs d’arrière-plan :

* « **Dark** » : utilisé sur fond gris (`--pr-t-elevation-surface-default`) et sur fond blanc (`--pr-t-elevation-surface-raised`),
* « **Light** » : utilisé sur fond blanc (`--pr-t-elevation-surface-raised`).
* « **White** » : utilisé sur fond gris (`--pr-t-elevation-surface-default`),

La couleur des bulles constituants l’ornementation s’adapte au thème utilisé.

Si les Highlight data sont utilisés pour remonter le résultat d’un processus (analyse, import, etc.), il est alors possible d’utiliser les palettes Success, Error ou Warning pour afficher l’information.

### Ornements

Les ornements ont pour but d’apporter de la vie et d’illustrer le composant, mais cela ne doit pas se faire au dépend de la lisibilité. **L’illustration ne doit pas être trop complexe**. Merci de vous référer à la liste des illustrations disponibles via le composant. Si besoin, ne pas hésiter à contacter le Studio.

L’ornementation peut être modulée selon l’importance que l’on souhaite donner à la donnée affichée (illustration et bulles, bulles seules, ni illustration ni bulles).

Il est possible d’utiliser une illustration pour mettre en exergue un Highlight data parmi d’autres.

Les ornements sont toujours à droite du bloc pour ne pas décaler le contenu.

- **Don't** : L'illustration ne doit jamais être affichée sur la gauche. Cela perturbe la lisibilité du contenu.
- **Don't** : De la même manière, le texte ne doit jamais être ferré à droite.

### Actions

Il est possible d’ajouter une action dans une box. Elle se matérialisera par un Button ou un Link.

L’ornementation ne doit pas entrer en conflit avec le contenu. Si un bouton ou un lien est positionné à droite, alors il ne faut pas afficher d’ornementation.

### Tailles

Le composant est disponible en **trois tailles (M, S et XS)** pour donner plus de flexibilité en fonction de la densité recherchée.

## Règles d’utilisation

### Mise en exergue

Dans un regroupement de Highlight data, il est possible de mettre en exergue une donnée via :

* l’utilisation du thème “Dark”,
* une illustration pour un seul des blocs.

### Cohérence visuelle et des informations

La cohérence entre les blocs doit être maintenue lors de l’assemblage :

* ne pas juxtaposer des contenus différents (donnée textuelle et donnée numérique),
* garder une hauteur de contenu cohérente entre tous les Highlight data,
* ne pas juxtaposer des Highlight data en S et en M,
* si un bloc contient un bouton, il doit être placé tout à gauche ou tout à droite pour éviter de noyer l’interaction au milieu des informations.

Quand plusieurs blocs sont juxtaposés, leur contenu respecte la même hiérarchie d’informations.

## Comportement

### Petits écrans et mobile

Sur les petits écrans et mobile, les Highlight data s’affichent les uns en dessous des autres. Les illustrations peuvent être masquées si la largeur est trop petite et que cela nuit à la lisibilité.

## Spécifications

Plusieurs Highlight data peuvent être affichés les uns à côté des autres, **dans un maximum de quatre**. Il faut alors les **espacer de 12px** pour garantir une bonne lisibilité.

Ils ne doivent pas systématiquement avoir la même largeur. Il est possible que l’un des Highlight data prenne plus de place pour mettre en avant la donnée qu’il contient.

Dans une Dialog, le composant peut prendre toute la largeur disponible.

Le composant du Design System prévoit plusieurs illustrations d’objets ainsi que plusieurs compositions de bulles. Il reste néanmoins possible de personnaliser plus spécifiquement les ornementations.

Elles doivent toujours respecter une taille fixe de **96x80px**. La taille s’adapte ensuite automatiquement en fonction de la taille utilisé pour le composant (M, S ou XS).
