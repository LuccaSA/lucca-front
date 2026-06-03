# empty-state — Design

**Mots-clés**vide, résultats, placeholder, page

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## **Anatomie**

## Illustrations

Les illustrations d'Empty state sont composées de deux types d'éléments visuels superposés qui créent de la profondeur et du contexte : les bulles et les illustrations métier.

Les bulles servent d'arrière-plan décoratif. Il existe **trois types de bulles** pour les propriétés `topRightBackground` et `bottomLeftBackground`.

Les illustrations métier sont des éléments graphiques au premier plan qui donnent du contexte et du sens à l'Empty state. Elles représentent visuellement le type de contenu ou d'action attendu et son appelées via les propriétés `topRightForeground` et `bottomLeftForeground`.

Le composant prévoit plusieurs illustrations génériques mais il est tout à fait possible d’utiliser une illustration personnalisée en respectant certaines règles :

* l’illustration ne doit pas dépasser **248 x 232px pour**`bottomLeftForeground` et **216 x 232px** pour `topRightForeground` ,
* l’illustration comporte **entre 1 et 3 objets**.
* ces objets représentent le contexte de l’utilisateur à ce moment du parcours,

## Typologie des messages

### Aucun contenu

L'Empty state est utilisé pour indiquer un état vide parce qu’aucune donnée n’existe et que l'utilisateur n'a pas la main pour en ajouter. Il n'y a donc pas de bouton d'actions.

### Aucun contenu mais action possible

Dans certains cas, l’Empty state ne se limite pas à informer l’utilisateur d’une absence de contenu, mais doit aussi l’inciter à agir directement pour créer ou ajouter des ressources.

Un ou deux boutons d'actions accompagnent le message.

### Erreur

Cette état signale qu’un problème technique ou fonctionnel empêche l’affichage des données.

Dans le cas d'une simple erreur, il est recommandé d'utiliser les illustrations `error-coffee` et `error`

Pour des erreurs de connexion ou de transmission de données, il est recommandé d'utiliser les illustrations `error-plug` et `plug`

Lorsqu'il n'est pas possible d'afficher les données pour des questions de droits, il est recommandé d'utiliser les illustrations `lock` et `error`

### Empty state positif (succès)

Dans ce contexte, l’absence de contenu est une bonne nouvelle : cela signifie que l’utilisateur a accompli ce qu’il devait faire. On profite donc de l'Empty state pour le féliciter.
