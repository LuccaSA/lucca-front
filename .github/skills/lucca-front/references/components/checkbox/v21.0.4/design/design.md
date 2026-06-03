# checkbox — Design

#### Des questions, commentaires ou retours ?

Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

## Options

### Message d’aide

Chaque bouton Radio peut afficher un message d’aide spécifique, placé sous son Label, pour donner une information jugée indispensable sur l’option.

### Champ obligatoire

Les champs obligatoires doivent être signalés explicitement aux utilisateurs. C’est à la fois une recommandation d’accessibilité et d’ergonomie : les utilisateurs complètent ainsi les formulaires sans avoir de doute sur le caractère obligatoire ou optionnel de chaque champ.

Si un champ obligatoire n’est pas renseigné, une erreur sera remontée à la soumission du formulaire.

### Groupe de Checkbox

Il est parfois nécessaire de regrouper plusieurs Checkbox. Dans ce contexte, il est important de retrouver un Label commun à ces Checkbox.

Par défaut, les groupes de Checkbox sont verticaux. Il est possible d’utiliser un affichage horizontal si ces conditions sont réunies :

* seules 2 options sont disponibles,
* l’intitulé de ces options reste court,
* il n’y a pas de message d’aide pour les options.

Si ces conditions ne sont pas remplies, l’affiche horizontal rend la lecture difficile.

### Checklist

Une version checklist est disponible. Cette version doit être utilisé comme une *to do list*, lorsque l'utilisateur coche quelque chose pour signifier que c'est réalisé.

La coche peut aussi être utilisée seule en début de ligne dans un Index table ou une Card.

## Comportement

### Navigation au clavier

Le composant Checkbox est entièrement navigable au clavier :

* l’utilisateur accède à la Checkbox via la touche Tab,
* la touche “Espace” permet de sélectionner ou désélectionner.

### Débordement

Si le Label ou le contenu des messages d’aide est plus long que l’espace disponible, le texte passe naturellement à la ligne.

### Champ en erreur

Un message d'erreur s'affiche lorsque le champ est indiqué comme obligatoire et qu’il n’est pas sélectionné. La Checkbox porte la couleur Critical.

### Zone interactive

Les utilisateurs peuvent sélectionner une option en cliquant directement sur le bouton ou sur le Label. Les deux zones doivent être interactives pour optimiser l’accessibilité du composant.

Dans le cas où le conteneur est plus large, seul le Label et le bouton sont cliquables. L’utilisateur ne peut pas cliquer en bout de ligne pour sélectionner une option.

- **Do** : Le label et le bouton sont interactifs.
- **Don't** : L'espace vide à droite des options n'est pas interactif.

## Règles d'utilisation

### Checkbox ou Radio ?

Utilisons un groupe de Checkbox si l’utilisateur peut sélectionner plusieurs options. Utilisons le Radio quand l'utilisateur ne peut faire qu'un seul choix.

- **Do** : Utilisons les Radio quand l'utilisateur a besoin de consulter les deux options avant de prendre sa décision.
- **Don't** : Évitons d’utiliser une Checkbox en cas de Label long et/ou de formulation ambigüe.
- **Do** : Utilisons une Checkbox quand l'utilisateur peut confirmer ou activer une option formulée de manière affirmative.
- **Don't** : N'utilisons pas de Radio avec deux options, dont l'une est simplement la négation de l’autre.
- **Do** : Utilisons des réponses "Oui/Non" à la place d'une Checkbox seulement quand l'utilisateur doit faire un choix clair et assumé entre les deux options.
- **Don't** : La Checkbox étant par défaut cochée ou non cochée, évitons de l'utiliser si l'on souhaite que l'utilisateur fasse un choix clair et assumé.

### Checkbox ou Select

Utilisons un groupe de Checkbox plutôt qu’un Select lorsque :

* les utilisateurs doivent voir immédiatement toutes les options disponibles,
* il est important de comparer visuellement les options,
* le nombre d’options est limité (en général entre 2 et 5),
* l’action est fréquente ou doit être rapide à effectuer, car les Checkbox permettent une sélection directe sans ouvrir de menu déroulant.

- **Do** : Privilégions un groupe de Checkbox quand l'utilisateur doit voir toutes les options possibles.
- **Caution** : N'utilisons pas de Select si le Label ne permet pas d'expliciter les options possibles.

#### Cas spécifiques avec deux options possibles

- **Do** : Utilisons une Checkbox quan le choix est explicite et quand le Label peut être formulé de manière affirmative.
- **Don't** : N'utilisons pas de Select lorsque seulement deux options sont possibles.
