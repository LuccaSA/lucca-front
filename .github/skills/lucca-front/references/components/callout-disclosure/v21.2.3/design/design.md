# callout-disclosure — Design

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6583:53040">

</design>

## **Palettes**

Il existe 5 variantes : neutre, informative, succès, alerte et erreur. Pour chacune, le Callout utilise une icône et une couleur d’arrière-plan spécifique afin d’appuyer le message.

* **Variante “Neutre”** pour le message a un ton neutre.
* **Variante “Informative”** pour un message nécessitant une attention particulière par rapport à la variante neutre. Cette variante s'affiche dans la couleur Product.
* **Variante “Succès”** pour informer l’utilisateur du succès d’une action ou d’un processus de l’outil.
* **Variante “Alerte”** pour avertir l’utilisateur d'une situation qui pourrait nécessiter une intervention prochaine mais non-critique dans son utilisation de l’outil.
* **Variante “Erreur”** pour indiquer une erreur ou un échec, ou pour transmettre quelque chose qui doit être immédiatement reconnu ou résolu.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6583:53036">

</design>

## Callout default

Le Callout default est la forme la plus classique et la plus utilisée du composant.

Il s’agit d’un message destiné à attirer l’attention de l’utilisateur sur une information importante, qu’il s’agisse d’une alerte, d’une erreur ou simplement d’une notification informative.

Il prends tout l'espace disponible en largeur, qu'il soit positionné dans une page ou dans une Dialog.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6583:53025">

</design>

### Actions

Le Callout peut proposer une action associée, présentée sous deux variantes. Le choix de la variante dépend du contexte d’affichage et de la densité de l’interface.

* **Bouton sous le texte :** utilisée par défaut. Elle est plus lisible lorsque le message du Callout est un peu long ou nécessite d’être lu avant d’agir.
* **Bouton aligné sur la même ligne :** plus compacte, convient aux Callouts affichés en pleine largeur dans une page. Elle permet de réduire l’encombrement vertical tout en mettant l’action en évidence.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6666:176030">

</design>

### **Effaçable**

Il est possible de supprimer le Callout si l’utilisateur juge l’information non pertinente où s'il a pris connaissance du message.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6583:53038">

</design>

- **Don't** : N'utilisons pas cette option lorsqu'il s'agit d'un message d'erreur ou d'alerte appelant l'utilisateur à réaliser une action. Cela bloquerait l'utilisateur.

### Pattern IA

Une variante spécifique permet d'afficher un contenu lié à l'IA. Pour en savoir plus, vous pouvez consulter la guideline dédiée.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6674:177091">

</design>

## **Callout popover**

Ce format permet de gagner un maximum de place. Il comprend juste l’icône et le nombre d’informations qu’il contient. Ces informations sont accessibles au survol via un Popover.

Il est notamment utilisé dans les Footer, pour indiquer à l'utilisateur le nombre d'erreurs ou d'alerte à corriger.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6715:4340">

</design>

Si le Callout ne contient qu'un seul message, alors le contenu du Popover ne contient pas de titre.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6939:431">

</design>

### Texte personnalisé

Par défaut, le Callout popover affiche un nombre pour indiquer le nombre de messages (erreurs, alertes, etc.) en attente. Ce chiffre permet à l’utilisateur de comprendre rapidement la quantité d’éléments à consulter.

Cependant, il est également possible d’afficher un texte personnalisé, au lieu d’un simple nombre.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6775:12103">

</design>

### Icône seule

Le Callout popover peut aussi être utilisé pour afficher un message de manière très discrète, en ne montrant que l’icône sans texte. Cette approche est utile pour signaler une information liée à une donnée précise, sans prendre de place.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6775:12139">

</design>

## Callout disclosure

Le Callout disclosure est conçu pour gérer des messages plus complexes ou multiples, offrant une interface compacte qui peut se déplier pour afficher des informations détaillées.

Par défaut, le Callout doit être fermé, l’utilisateur peut lui-même choisir d'afficher plus d'information s'il le souhaite.

Il prends tout l'espace disponible en largeur, qu'il soit positionné dans une page ou dans une Dialog.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6774:10899">

</design>

### Actions

Chaque message informatif peut contenir ou non une action, via un Button qui s'affiche directement sous le message. Un même Callout disclosure peut contenir à la fois des messages avec et sans bouton d'action.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6715:4281">

</design>

Il est possible de remplacer les boutons d'action par un lien si le but est de renvoyer l'utilisateur vers un contenu externe au logiciel.

Le lien dans les Callout doit utiliser la couleur Neutral et non pas la couleur Product.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6774:11437">

</design>
