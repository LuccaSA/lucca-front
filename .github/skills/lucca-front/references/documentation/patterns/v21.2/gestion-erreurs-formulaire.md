# Gestion des erreurs

# Content

## Prévention des erreurs

En prévention des éventuelles erreurs, le label des champs obligatoires porte systématiquement un astérisque rouge (*).

En plus de cet élément graphique, il faut également ajouter dans le code la propriété `aria-required="true"` sur les champs concernés.

## Déclenchement des erreurs

### Lors de la complétion du formulaire

Lorsqu’un champ obligatoire n’est pas renseigné, il est possible d’interagir avec ce champ sans qu’une erreur soit déclenchée. En revanche, si l’utilisateur commence à saisir, puis décide de supprimer ce qu’il a tapé, on considère cela comme une erreur qui est donc remonté au blur. Pour un champ avec un format spécifique imposé (email, url, date, mot de passe, etc.), qu’il soit obligatoire ou non, les erreurs sont déclenchées au blur lorsque le format n’est pas respecté.

Lorsqu’un champ obligatoire est renseigné, une erreur est déclenchée au blur si l’utilisateur efface la saisie.

Ces différents états sont gérés grâce aux états `touched`/`invalid` des champs de formulaire Angular (via les classes CSS `ng-touched` et `ng-invalid`). Ces classes sont automatiquement ajoutées par Angular lors de l'utilisation de `ngModel` et `formControl`.

Une directive disponible prochainement dans Lucca Front, à placer sur les différents champs de formulaires, permettra de gérer le premier exemple du visuel ci-dessus.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4066:80722">

</design>

### À la soumission du formulaire

Dans l’idée d’un design optimiste, le bouton de validation d’un formulaire [doit toujours être actif](https://www.smashingmagazine.com/2021/08/frustrating-design-patterns-disabled-buttons/). On laisse la possibilité à l’utilisateur de cliquer dessus, quand bien même le formulaire n’est pas complet. Les erreurs sont alors remontées à l’utilisateur pour qu’il puisse les corriger.

À la soumission, il est conseillé d'utiliser la méthode Angular `[markAllAsTouched()](https://angular.io/api/forms/AbstractControl#markastouched)`afin d'afficher l'ensemble des erreurs du formulaire.

- **Do** : Nous affichons toujours le bouton actif.
- **Don't** : Dans un formulaire, nous n'affichons jamais un bouton inactif.

## Affichage des erreurs

### Au niveau des champs

L’utilisateur doit pouvoir rapidement se rendre compte des champs en erreur dans le formulaire. Pour cela il est nécessaire de les faire ressortir via un état d’erreur, à savoir la couleur rouge ainsi qu’une icône.

Un message adapté est affiché à côté de chaque champ en erreur en tâchant d'être le plus explicite possible.

Les messages d’erreurs sont supprimés au *change* dès que les champs repassent à un état valide.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4066:80783">

</design>

### Au niveau du formulaire

Lorsqu'une ou plusieurs erreurs sont remontées dans le formulaires, nous affichons un Callout popover dans le Footer, précisant le nombre d’erreur dans l’ensemble du formulaire.

Il n'apparaît qu'à la soumission du formulaire et disparaît lorsque l’utilisateur corriges les erreurs remontées. Son contenu change au fur et à mesure que l'utilisateur corrige les erreurs.

Le premier champ du formulaire en erreur doit prendre le focus ce qui permettra au navigateur de positionner la barre de défilement afin de rendre visible l’élément en question. Cette animation sur la barre de défilement doit se faire doucement afin d’éviter un saut visuel.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4066:80820">

</design>
