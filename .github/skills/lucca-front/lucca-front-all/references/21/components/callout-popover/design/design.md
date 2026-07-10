# callout-popover — Design

**Mots-clés**alerte, avertissement, notification

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## **Palettes**

Il existe 5 variantes : neutre, informative, succès, alerte et erreur. Pour chacune, le Callout utilise une icône et une couleur d’arrière-plan spécifique afin d’appuyer le message.

* **Variante “Neutre”** pour le message a un ton neutre.
* **Variante “Informative”** pour un message nécessitant une attention particulière par rapport à la variante neutre. Cette variante s'affiche dans la couleur Product.
* **Variante “Succès”** pour informer l’utilisateur du succès d’une action ou d’un processus de l’outil.
* **Variante “Alerte”** pour avertir l’utilisateur d'une situation qui pourrait nécessiter une intervention prochaine mais non-critique dans son utilisation de l’outil.
* **Variante “Erreur”** pour indiquer une erreur ou un échec, ou pour transmettre quelque chose qui doit être immédiatement reconnu ou résolu.

## Callout

Le Callout standard est la forme la plus classique et la plus utilisée du composant. Il est idéal pour délivrer des messages explicites nécessitant parfois une interaction directe pour résoudre l'alerte.

Il occupe toute la largeur disponible de son conteneur parent.

### Options

#### **Effaçable**

Il est possible de supprimer le Callout si l’utilisateur juge l’information non pertinente où s'il a pris connaissance du message.

- **Don't** : N'utilisons pas cette option lorsqu'il s'agit d'un message d'erreur ou d'alerte appelant l'utilisateur à réaliser une action. Cela bloquerait l'utilisateur.

#### Pattern IA

Une variante spécifique permet d'afficher un contenu lié à l'IA. Pour en savoir plus, vous pouvez consulter la guideline dédiée.

## **Callout popover**

Ce format permet de gagner un maximum de place. Il comprend juste l’icône et le nombre d’informations qu’il contient. Ces informations sont accessibles au survol via un Popover.

Il est notamment utilisé dans les Footer, pour indiquer à l'utilisateur le nombre d'erreurs ou d'alerte à corriger.

### Options

#### Messages multiples

Le CalloutPopover est conçu pour pouvoir afficher plusieurs messages d’alerte, d’erreur ou de succès.

Pour cela les messages (`FeedbackItem`) viennent s’empiler sous forme de liste (`FeedbackList`). Chacun de ces `FeedbackItem` contient sa propre description et ses actions associées. Il est possible d’alterner des messages avec et sans action.

Lorsque plusieurs messages sont affichés, **un titre doit obligatoirement introduire** le contenu du Popover. Pour cela, il est nécessaire de renseigner une valeur dans la propriété `heading`.

#### Message unique

Si le CalloutPopover ne contient qu'un seul message, alors le contenu du Popover ne contient pas de titre. Pour cela, la propriété `headingHiddenIfSingleItem` doit être activée.

#### Texte personnalisé

La propriété `buttonLabel` permet de renseigner le label du CalloutPopover.

Par défaut le composant affiche un nombre pour indiquer le nombre de messages (erreurs, alertes, etc.) qu’il contient. Cependant, il est également possible d’afficher un texte personnalisé, au lieu d’un simple nombre.

#### Icône seule

Le CalloutPopover peut aussi être utilisé pour afficher un message de manière très discrète, en ne montrant que l’icône sans texte. Cette approche est utile pour signaler une information liée à une donnée précise, sans prendre de place.

Pour cela, la propriété `buttonLabel` doit être vide.

### Comportement

#### Interactions

La propriété `popoverTrigger` permet de choisir le comportement d’affichage du Popover :

* `click` permet d’ouvrir le Popover seulement au clic
* `click+hover` permet de l’ouvrir au clic mais aussi au survol. Si l’utilisateur navigue au clavier, il faudra appuyer sur `Entrée` pour ouvrir le Popover.
* `hover+focus` permet de l’ouvrir au survol mais aussi directement au focus. C’est à dire que l’utilisateur n’aura pas besoin d’appuyer sur `Entrée` pour consulter le détail des messages.

#### Délai d’affichage

Les propriétés `openDelay` et `closeDelay` permettent de paramétrer le délai d’affichage du Popover.

* `openDelay` prend la valeur de 50ms par défaut pour une ouverture rapide.
* `closeDelay` prend la valeur de 500ms par défaut. Cela permet à l’utilisateur de ne pas faire disparaitre le Popover immédiatement s’il sort de la zone en naviguant à la souris.

## Callout disclosure

Le CalloutDisclosure est une variante repliable du Callout, conçu pour afficher une liste de plusieurs messages.

Il comporte un en-tête cliquable qui permet de masquer ou d'afficher le contenu détaillé. Par défaut, le Callout doit être fermé, l’utilisateur peut lui-même choisir d'afficher plus d'information s'il le souhaite.

Il occupe toute la largeur disponible de son conteneur parent.

### Options

#### Messages multiples

Le CalloutDisclosure est conçu pour pouvoir afficher plusieurs messages d’alerte, d’erreur ou de succès.

Pour cela les messages (`FeedbackItem`) viennent s’empiler sous forme de liste (`FeedbackList`). Chacun de ces `FeedbackItem` contient sa propre description et ses actions associées. Il est possible d’alterner des messages avec et sans action.

#### Message unique

Lorsqu’un message est long mais ne doit pas prendre autant de place sur une page, il est possible d’utiliser le CalloutDisclosure pour pouvoir afficher/masquer le contenu.

## Règles d’utilisation

### Boutons ou liens ?

#### Action locale et immédiate

L'action s'exécute immédiatement sur la page ou le formulaire en cours. Elle applique une correction, sans redirection.

Dans ce contexte, **l’action doit être portée par le composant Button**.

- **Do** : Utilisons le composant Button pour les actions locale.

#### Navigation de résolution

L'utilisateur doit être redirigé, souvent dans un nouvel onglet ou vers une autre page du logiciel ou un autre logiciel, dans le but d'effectuer une action précise et obligatoire pour résoudre l'anomalie et débloquer son parcours actuel.

Dans ce contexte, **l’action doit être porté par le composant Button**.

- **Do** : Utilisons le composant Button pour rediriger l’utilisateur vers une actions en dehors de son parcours actuel.
- **Don't** : N'utilisons pas le composant Link pour des actions à fort impact, cela ne rend pas les actions suffisamment visibles pour l’utilisateur.

#### Redirection d'information

L'action renvoie l'utilisateur vers une page externe ou une documentation à des fins de simple consultation ou d'information. Elle n'a aucun impact sur le formulaire ou le flux en cours.

Dans ce contexte, **l’action doit être porté par le composant Link**.

Pour une lecture plus fluide, le lien de redirection est indiqué après la description :

* l’intitulé indique de manière claire à l’utilisateur ce qu’il se passe s’il clique dessus.
* le lien doit tenir sur une seule ligne.
* si le lien, situé en bout de ligne, est trop long, alors il est affiché sur une ligne en-dessous.

- **Do** : Utilisons le composant Link pour les liens de redirection.

#### Navigation interne

Utilisé dans les résumés d'erreurs ou d’alerte, le clic sert de navigation : il déplace le scroll de la page et force le focus visuel de l'utilisateur directement sur le champ en anomalie pour qu'il puisse le compléter. Ce système de redirection n’est pas obligatoire et ne doit être utilisé que si le contenu de la page est dense pour éviter à l’utilisateur une perte de temps.

Dans ce contexte, **l’action doit être porté par le composant Link**.

- **Do** : Utilisons le composant Link pour les liens de redirection interne.
