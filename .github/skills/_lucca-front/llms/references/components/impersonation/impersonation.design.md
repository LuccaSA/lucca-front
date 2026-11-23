# impersonation — Design Guidelines

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/76a264)

# Design

**Mots-clés :**user, select

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Définition

Le pattern d’Impersonation permet à un utilisateur d’accéder au contenu d’une page d’un collaborateur dans un but de consultation ou pour y effectuer des actions. Cela évite la création de pages ou de vues pour un besoin d'administration.

L’utilisateur disposant des droits d'impersonation, intervient directement dans le contexte du collaborateur sélectionné, tout en garantissant une traçabilité complète : chaque opération est enregistrée et historisée sous l'identité de l’utilisateur connecté et non celle du collaborateur sélectionné. Ainsi, chaque action est attribuable au bon utilisateur dans l’historique des actions.

## Anatomie

## Options

### **Inclure les collaborateurs partis**

Cette option permet d'inclure dans la liste des collaborateurs sélectionnables les collaborateurs ayant quitté l'entreprise (anciens collaborateurs). Par défaut, seuls les collaborateurs actifs sont affichés. En cochant cette case, la liste s'étend pour afficher aussi les collaborateurs partis

## Comportement

### État par défaut

Par défaut, sur une interface où la fonctionnalité d’impersonation est disponible, le contenu présente les données du **compte du collaborateur connecté**.

Le composant affiche donc l’Avatar, le prénom et le nom du collaborateur connecté.

### Collaborateur sélectionné

Lorsqu’un autre collaborateur est sélectionné, le contenu du composant est donc **remplacé par l’Avatar, le prénom ainsi que le nom de ce collaborateur**.

À ce contenu vient s’ajouter le composant Clear, permettant de revenir à l’état par défaut.

Pour appuyer visuellement l’aspect actif de l’impersonation, le composant se voit appliquer la couleur `product`.

### Affichage des homonymes

Dans le cas où la liste des collaborateurs contient deux homonymes, nous affichons, comme dans le composant Select, un sous-texte indiquant le département du collaborateur.

## Règles d’utilisation

### Positionnement dans la page

Par garder une cohérence entre les logiciels, le composant d’Impersonation doit se situer toujours au même endroit : **à droite du titre de la page**.

- **Do** : Positionnons le composant d’Impersonation directement après le titre de la page.

### Impact sur le titre des pages

L’utilisation de l’Impersonation n’a aucun impact sur le titre des pages. De manière générale, nous n’utilisons pas des titres comme “Mes formations” ou “Mes dépenses”. Privilégions l’utilisation d’un titre de page sans possessif.

- **Don't** : N’ajoutons pas la préposition “de” à la fin du titre. Le titre ne doit pas être lu comme une phrase se terminant par le composant d’impersonation.
- **Don't** : Ne changeons pas le titre de la page lorsque l’Impersonation n’est pas disponible. N’ajoutons pas “Mes” devant le titre.
