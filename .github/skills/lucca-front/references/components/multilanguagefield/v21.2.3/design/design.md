# multilanguagefield — Design

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7807:7454">

</design>

**Mots-clés :**multilingue, traduction, i18n, langues

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7812:121455">

**Anatomie**

**Anatomie**

<notes>

1. **Label :** Le label du champ doit indiquer quel type d'information le champ requiert.
2. **Champ de saisie :** Le champ dans lequel les utilisateurs cliquent pour saisir du texte. La valeur saisie dans ce champ sera appliquée pour les langues qui ne sont pas renseignées dans le Popover.
3. **Message d’aide (Inline message) :** Le message d’aide est optionnel. Il permet de fournir des informations supplémentaires à l’utilisateur pour l’aider à compléter le champ.
4. **Bouton :** Le bouton placé dans le champ permet d’ouvrir un Popover.
5. **Popover :** Le Popover contient un ensemble de Textfield. Chaque Textfield correspond à une locale traduisible.

</notes>

</design>

## Options

### Champ obligatoire

Les champs obligatoires doivent être signalés explicitement. Pour garantir une accessibilité et une ergonomie optimales, le label du champ principal doit porter l'astérisque rouge `*`. 

Cette obligation peut s'étendre aux langues secondaires. Dans ce cas, la mention obligatoire est renseignée au niveau de l'indicateur de chaque langue à l'intérieur du popover. L'obligation s'applique à l'ensemble des langues activées. Il n'est pas possible de rendre obligatoire une langue et pas une autre.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7812:121467">

</design>

Si un champ obligatoire n’est pas renseigné, une erreur sera remontée à la soumission du formulaire. Pour en savoir plus, vous pouvez vous référer à la  guideline sur les formulaires. Si le champ invariant est vide, l'erreur affichée doit porter sur celui-ci, même si des traductions manquent dans le popover.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7812:121486">

</design>

Si des langues obligatoires manquent dans le popover, l’inline message doit lister explicitement les langues manquantes.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7812:121488">

</design>

### Inactif

Un champ inactif indique qu'un champ de saisie existe, mais qu'il n'est pas disponible dans ce contexte, à un instant donné. Cela peut être utilisé pour maintenir la continuité de la mise en page et indiquer qu'un champ peut devenir disponible ultérieurement.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7812:121491">

</design>

Le bouton dans le champ reste cliquable pour permettre à l’utilisateur de consulter les traductions renseignées.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7812:121494">

</design>

### Ouverture du popover

Par défaut, le popover de traduction s'ouvre au clic sur l'icône dédiée. Une option `openOnFocus` permet l'affichage automatique du popover dès que le champ reçoit le focus, afin d’améliorer la découvrabilité des autres langues à traduire.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7812:121497">

</design>

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
