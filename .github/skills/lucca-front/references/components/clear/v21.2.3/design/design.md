# clear — Design

**Mots-clés :**effacer, reset, vider, supprimer, delete

## Règles générales

De manière générale, le Clear n’apparaît que lorsqu’une valeur est saisie ou sélectionnée dans un champ optionnel. Si le champ est obligatoire, alors on ne permet pas à l'utilisateur d'en effacer le contenu.

 Il ne doit pas être visible quand le champ est vide (avec ou sans placeholder).

## Dans un Textfield

- **Do** : De manière générale, n'affichons pas le Clear dans les Text field. Il est préférable de laisser l’utilisateur effacer sa saisie manuellement.
- **Don't** : Ne surchargeons pas les formulaires avec des boutons Clear dans chaque champ. Cela alourdit visuellement l’interface, notamment lorsque le formulaire contient beaucoup de champs.
- **Do** : Utilisons le Clear dans les champs de recherche. Il permet à l’utilisateur de réinitialiser facilement sa recherche.
- **Don't** : N’utilisons pas de Clear dans un champ de recherche vide. Le bouton doit apparaître uniquement si une valeur est saisie.

## Dans un Date picker

- **Do** : Affichons le Clear uniquement si le champ est optionnel. Cela permet à l’utilisateur d'effacer la date la date.
- **Don't** : Ne proposons pas de Clear si la date est obligatoire. L’utilisateur ne doit pas pouvoir effacer une date requise.

## Dans un Select

- **Do** : Affichons le Clear si le Select est optionnel. C’est la seule possibilité pour l’utilisateur d’effacer le contenu du champ.
- **Don't** : N’ajoutons pas de Clear dans un Select obligatoire. L’utilisateur ne doit pas pouvoir le vider s’il doit forcément faire un choix.

### Alternative "valeur nulle"

Pour éviter d'afficher un Clear dans un Select, si beaucoup de champs sont présents sur une interface ou dans un formulaire, il est possible d'afficher une valeur nulle parmi les options. Le champ est alors obligatoire.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6223:675">

</design>

## Composants associés
