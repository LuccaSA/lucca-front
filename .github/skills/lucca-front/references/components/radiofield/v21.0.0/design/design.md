# radiofield — Design

#### Des questions, commentaires ou retours ?

Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

## Options

### Orientation

Par défaut, les groupes de Radios sont **verticaux**.

Il est possible d’utiliser un affichage horizontal si ces conditions sont réunies :

* seules 2 options sont possibles,
* l’intitulé de ces options reste court,
* il n’y a pas de message d’aide pour les options.

Si ces conditions ne sont pas remplies, l’affiche horizontal rend la lecture difficile.

### Tag

Le Radio peut porter un Tag, notamment pour indiquer une option recommandée. Ce Tag est positionnée près du label et porte la couleur Product.

Seule une des options peut porter un Tag pour la distinguer des autres.

### Message d’aide

Un message d’aide peut être utilisé pour apporter un complément d’information à l’utilisateur. Il peut s’appliquer à deux niveaux.

#### Au niveau du groupe

Un message d’aide global permet de contextualiser l’ensemble du choix (expliquer les conséquences du choix, les critères à prendre en compte).

#### Au niveau de chaque option

Chaque bouton Radio peut afficher un message d’aide spécifique, placé sous son Label, pour donner plus d’information sur l’option.

## Comportement

### Navigation au clavier

Le composant Radio est entièrement navigable au clavier :

* l’utilisateur accède au groupe via la touche Tab,
* une fois dans le groupe, les flèches directionnelles (← et → ou ↑ et ↓) permettent de changer l’option sélectionnée.

Ces comportements sont natifs au navigateur et l’état focus vient s’ajouter à l’état sélectionnée de l’option.

### Débordement

Si les Labels ou le contenu des messages d’aide sont plus longs que l’espace disponible, le texte passe naturellement à la ligne.

### Champ en erreur

Un message d'erreur s'affiche lorsque le champ est indiqué comme obligatoire et qu’aucune option n’est sélectionnée. Les Radio portent la couleur Critical.

### Zone interactive

Les utilisateurs peuvent sélectionner une option en cliquant directement sur le bouton ou sur le label. Les deux zones doivent être interactives pour optimiser l’accessibilité du composant.

Dans le cas où le conteneur est plus large, seul le label et le bouton sont cliquables. L’utilisateur ne peut pas cliquer en bout de ligne pour sélectionner une option.

- **Do** : Le label et let bouton sont interactifs.
- **Don't** : L'espace vide à droite des options n'est pas interactif.

## Règles d'utilisation

### Sélection par défaut

Il est possible de sélectionner ou non une valeur par défaut en fonction du contexte d’utilisation du composant. Un [article de NNGroup](https://www.nngroup.com/articles/radio-buttons-default-selection/) sur ce sujet est disponible.

#### Sélectionner une valeur par défaut…

* Pour optimiser et fluidifier l’expérience. Si la plupart des utilisateurs font le même choix, vous pouvez sélectionner ce choix par défaut.
* Pour indiquer à l’utilisateur qu’une réponse obligatoire est attendue. Lorsqu’une option est sélectionnée par défaut, il n’est pas nécessaire de marquer le champ comme étant obligatoire.

#### Éviter de sélectionner une valeur par défaut…

* Si vous ne savez pas ce que souhaite faire l’utilisateur et aucune des options n’est plus légitime que les autres.
* Pour s’assurer que l’utilisateur consulte la liste des options et sélectionne de son plein-gré car le choix a des conséquences importantes sur la suite du parcours ou le paramétrage de l’application.

### Champ optionnel

L’option “Aucun/Aucune” doit être utilisée lorsque le Radio fieldset est facultatif dans un formulaire. Elle permet à l’utilisateur de revenir facilement à un état non sélectionné, tout en conservant le principe de sélection unique propre aux Radios.

Si l'option "Aucun/Aucune" est sélectionnée par défaut, alors il n'est pas nécessaire de marquer le champ comme obligatoire.

- **Do** : Ajoutons une option de réinitialisation explicite (ex. : « Aucun ») lorsque le champ n’est pas obligatoire. Plaçons-la soit en début de liste.
- **Don't** : N'oublions pas l'option de réinitialisation si le champ est optionnel. Si l'utilisateur sélectionne une option et ne peut pas la désélectionner, il se retrouve bloqué.

### Radio ou Checkbox

Utilisons un Radio pour un choix exclusif (une seule option possible). Lorsque plusieurs options peuvent être cochées, utilisons des Checkbox.

- **Do** : Utilisons des Radio si les deux réponses doivent être mises en regard pour que l’utilisateur les consulte avant de faire un choix.
- **Don't** : Évitons d’utiliser une Checkbox si le label est long et/ou la formulation ambigüe.
- **Do** : Utilisons une Checkbox quand le choix est explicite et quand le label peut être formulé de façon affirmative, simple.
- **Don't** : N'utilisons pas de Radio avec deux options, dont l'une ne fait que décliner l’autre sous la forme négative.
- **Do** : Utilisons des réponses "Oui/Non" à la place d'une Checkbox si l'on souhaite que l'utilisateur fasse un choix clair et assumé entre les deux options.
- **Don't** : La Checkbox étant par défaut cochée ou non, évitons de l'utiliser si l'on souhaite que l'utilisateur fasse un choix.

### Radio ou Select

Utilisez des **Radio** plutôt qu’un Select lorsque :

* les utilisateurs doivent voir immédiatement toutes les options disponibles,
* il est important de comparer visuellement les options,
* le nombre d’options est limité (en général entre 2 et 5),
* l’action est fréquente ou doit être rapide à effectuer, car les Radio permettent une sélection directe sans ouvrir de menu déroulant.

À l’inverse, préférez un **Select** lorsque :

* l’utilisateur connaît déjà les options et n’a pas besoin de les voir toutes en même temps,
* il y a beaucoup d’options (au-delà de 6),
* l’objectif est de gagner de la place dans l’interface.
