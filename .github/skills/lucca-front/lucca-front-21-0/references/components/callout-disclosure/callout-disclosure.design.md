# callout-disclosure — Design Guidelines

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/64c8d8)

# Design

#### Des questions, commentaires ou retours ?

Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## **Palettes**

Il existe 5 variantes : neutre, informative, succès, alerte et erreur. Pour chacune, le Callout utilise une icône et une couleur d’arrière-plan spécifique afin d’appuyer le message.

* **Variante “Neutre”** pour le message a un ton neutre.
* **Variante “Informative”** pour un message nécessitant une attention particulière par rapport à la variante neutre. Cette variante s'affiche dans la couleur Product.
* **Variante “Succès”** pour informer l’utilisateur du succès d’une action ou d’un processus de l’outil.
* **Variante “Alerte”** pour avertir l’utilisateur d'une situation qui pourrait nécessiter une intervention prochaine mais non-critique dans son utilisation de l’outil.
* **Variante “Erreur”** pour indiquer une erreur ou un échec, ou pour transmettre quelque chose qui doit être immédiatement reconnu ou résolu.

## Callout default

Le Callout default est la forme la plus classique et la plus utilisée du composant.

Il s’agit d’un message destiné à attirer l’attention de l’utilisateur sur une information importante, qu’il s’agisse d’une alerte, d’une erreur ou simplement d’une notification informative.

Il prends tout l'espace disponible en largeur, qu'il soit positionné dans une page ou dans une Dialog.

### Actions

Le Callout peut proposer une action associée, présentée sous deux variantes. Le choix de la variante dépend du contexte d’affichage et de la densité de l’interface.

* **Bouton sous le texte :** utilisée par défaut. Elle est plus lisible lorsque le message du Callout est un peu long ou nécessite d’être lu avant d’agir.
* **Bouton aligné sur la même ligne :** plus compacte, convient aux Callouts affichés en pleine largeur dans une page. Elle permet de réduire l’encombrement vertical tout en mettant l’action en évidence.

### **Effaçable**

Il est possible de supprimer le Callout si l’utilisateur juge l’information non pertinente où s'il a pris connaissance du message.

- **Don't** : N'utilisons pas cette option lorsqu'il s'agit d'un message d'erreur ou d'alerte appelant l'utilisateur à réaliser une action. Cela bloquerait l'utilisateur.

### Pattern IA

Une variante spécifique permet d'afficher un contenu lié à l'IA. Pour en savoir plus, vous pouvez consulter la guideline dédiée.

## **Callout popover**

Ce format permet de gagner un maximum de place. Il comprend juste l’icône et le nombre d’informations qu’il contient. Ces informations sont accessibles au survol via un Popover.

Il est notamment utilisé dans les Footer, pour indiquer à l'utilisateur le nombre d'erreurs ou d'alerte à corriger.

Si le Callout ne contient qu'un seul message, alors le contenu du Popover ne contient pas de titre.

### Texte personnalisé

Par défaut, le Callout popover affiche un nombre pour indiquer le nombre de messages (erreurs, alertes, etc.) en attente. Ce chiffre permet à l’utilisateur de comprendre rapidement la quantité d’éléments à consulter.

Cependant, il est également possible d’afficher un texte personnalisé, au lieu d’un simple nombre.

### Icône seule

Le Callout popover peut aussi être utilisé pour afficher un message de manière très discrète, en ne montrant que l’icône sans texte. Cette approche est utile pour signaler une information liée à une donnée précise, sans prendre de place.

## Callout disclosure

Le Callout disclosure est conçu pour gérer des messages plus complexes ou multiples, offrant une interface compacte qui peut se déplier pour afficher des informations détaillées.

Par défaut, le Callout doit être fermé, l’utilisateur peut lui-même choisir d'afficher plus d'information s'il le souhaite.

Il prends tout l'espace disponible en largeur, qu'il soit positionné dans une page ou dans une Dialog.

### Actions

Chaque message informatif peut contenir ou non une action, via un Button qui s'affiche directement sous le message. Un même Callout disclosure peut contenir à la fois des messages avec et sans bouton d'action.

Il est possible de remplacer les boutons d'action par un lien si le but est de renvoyer l'utilisateur vers un contenu externe au logiciel.

Le lien dans les Callout doit utiliser la couleur Neutral et non pas la couleur Product.

# Content

## **Contenu et rédaction**

Formulons toutes les phrases : 

* À la voix active, 
* Sans point d’exclamation, 
* Sans négation, quand c’est possible.

### **Callout default**

* Le titre est **optionnel**. S’il est appliqué, son but est de décrire de manière brève et concise l’information – c'est-à-dire en 1 seule ligne maximum. Son utilisation doit être exceptionnelle.
* Pas de point à la fin d’un titre.
* La description est **obligatoire**.
* Associée à un titre, la description ne doit pas répéter ou reformuler le titre mais doit donner une information complémentaire. Elle répond à la question "*Le titre ne me donne pas assez d'informations : pouvez-vous me préciser l’enjeu de l’action ?*" La description ne donne pas plus d’information que le titre ? Alors limitons-nous à la seule description.
* S’il y a un bouton d’action, la description ne doit pas répéter ou reformuler l’intitulé du bouton.
* Le bouton d’action est **optionnel**. L’intitulé du bouton doit être clair : si on lit le seul intitulé du bouton, hors contexte, l’utilisateur sait-il vers quoi cela pointe ?
* Le texte peut contenir un lien de redirection. Dans ce cas il s'affiche dans la couleur du texte et non pas dans la couleur Product.

- **Do** : Utilisons un titre s'il est nécessaire de décrire de manière brève et concise l'information.
- **Don't** : N'utilisons pas de titre s'il n'apporte pas plus d'information que la decription.

### **Callout disclosure et popover**

* Le titre est **obligatoire s'il y a plusieurs messages de succès, d'alerte ou d'erreur**. Il décrit le fait qu’il y a plusieurs informations, en explicitant leur nombre.
* Une description précise est **obligatoire** pour chacune de ces informations de la liste. 
* Si plusieurs actions sont liées à une même information, il faut éviter de répéter le même message plusieurs fois pour des raisons de lisibilité.   Quand c’est possible, on peut donc regrouper les éléments nécessitant la même action dans la même phrase. 
* Le bouton n’est **pas obligatoire**. Si nous l’utilisons, son intitulé doit être clair.  Ne nous contentons pas de répéter les termes du bouton d’action dans la description.
