# multilanguagefield — Design

**Mots-clés :**multilingue, traduction, i18n, langues

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

## Options

### Champ obligatoire

Les champs obligatoires doivent être signalés explicitement. Pour garantir une accessibilité et une ergonomie optimales, le label du champ principal doit porter l'astérisque rouge `*`. 

Cette obligation peut s'étendre aux langues secondaires. Dans ce cas, la mention obligatoire est renseignée au niveau de l'indicateur de chaque langue à l'intérieur du popover. L'obligation s'applique à l'ensemble des langues activées. Il n'est pas possible de rendre obligatoire une langue et pas une autre.

Si un champ obligatoire n’est pas renseigné, une erreur sera remontée à la soumission du formulaire. Pour en savoir plus, vous pouvez vous référer à la  guideline sur les formulaires. Si le champ invariant est vide, l'erreur affichée doit porter sur celui-ci, même si des traductions manquent dans le popover.

Si des langues obligatoires manquent dans le popover, l’inline message doit lister explicitement les langues manquantes.

### Inactif

Un champ inactif indique qu'un champ de saisie existe, mais qu'il n'est pas disponible dans ce contexte, à un instant donné. Cela peut être utilisé pour maintenir la continuité de la mise en page et indiquer qu'un champ peut devenir disponible ultérieurement.

Le bouton dans le champ reste cliquable pour permettre à l’utilisateur de consulter les traductions renseignées.

### Ouverture du popover

Par défaut, le popover de traduction s'ouvre au clic sur l'icône dédiée. Une option `openOnFocus` permet l'affichage automatique du popover dès que le champ reçoit le focus, afin d’améliorer la découvrabilité des autres langues à traduire.

## Règles d'utilisation 

### Choisir une largeur appropriée

La largeur doit être basée sur la grille de construction d’un formulaire.

Le contenu pouvant être plus ou moins grand en fonction de la langue, il est conseillé de donner au champ une largeur de 3 ou 4 colonnes pour garantir une utilisation optimale.

- **Do** : Utilisons une largeur de 3 ou 4 colonnes.
- **Don't** : N’utilisons pas une largeur trop faible.

### Effacer le contenu du champ

Il ne faut pas utiliser le composant Clear dans les Multilanguage textfield, cela alourdit grandement les formulaires. Il est préférable de laisser l’utilisateur effacer sa saisie manuellement. Il en va de même dans les Textfield situés à l’intérieur du Popover.

- **Do** : Laissons l’utilisateur effacer lui-même sont contenu.
- **Don't** : N’utilisons pas de Clear pour effacer le contenu rédiger par l’utilisateur
