# empty-state — Design Guidelines

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/49b0ef)

# Design

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

# Content

## **Titre du message**

### **Intention principale**

* Indiquer en peu de mots à l'utilisateur pourquoi il n'y a pas de contenu.
* L’information principale doit se concentrer dans le titre.
* **Gardons en tête l’hypothèse selon laquelle l’utilisateur ne lira pas forcément votre description**. 
* Le contenu du titre peut répondre à la question “Qu’est-ce qui fait que ‘rien’ ne s’affiche ?“, ou “Qu’est-ce qui ne va pas ?”.

### **Recommandations**

* Pas de point final pour les titres.
* Les titres peuvent contenir de la ponctuation (une virgule ou un deux-points), mais il est d'usage de ne jamais leur mettre de point final.
* On peut mettre une ponctuation finale (autre que le point), comme un point d'interrogation. Évitons le point d'exclamation.
* Les points de suspension (…) sont à manier avec prudence, car ils peuvent sous-entendre qu’on n’arrive pas à tout dire.
* Si l’empty state ne relaie aucune urgence, ou s’il ne vise pas à susciter de vigilance, d’urgence, on peut réfléchir à une accroche plus “légère”, une expression d’un registre familier, mais restant brève, courtoise, positive.

## **Description**

### **Intention principale**

* La description offre une information complémentaire et utile à celle du titre et explicite davantage la raison de cet *empty state*. Il n'y a vraiment aucune info complémentaire utile à communiquer ? Alors limitons-nous au titre.
* Guidons l’utilisateur, encourageons-le à une action alternative, utile.
* Lui montrer le bénéfice de sa prochaine action, s’il y en a une opportune à effectuer de suite.

### **Recommandations**

* Évitons d’y répéter le contenu du titre. Que ce soit les mots ou le sens.
* 1 phrase = 1 seule info. Utile, complémentaire au titre, pertinente, qui rend service et détaille l’intérêt de l’action proposée.
* Employons la voix active (pas la voix passive).
* Évitons au maximum les négations.
* Passons-nous des “qui, que, dont, parce que, lorsque”, etc.
* Mettons un point à la fin de chaque phrase.
* Évitons autant que possible que l’utilisateur recherche davantage d'informations ailleurs sur l’interface.
* En cas de forme interrogative, veillons à insérer une espace insécable avant le point d’interrogation pour qu’il ne soit pas isolé.

## **Actions**

### **Intention principale**

* Inciter à effectuer la prochaine étape la plus importante pour l’utilisateur.

### **Recommandations**

* Le bouton d’action offre à l’utilisateur une prolongation de son action : est-elle utile ou non ?
* Éviter au maximum d’y répéter les mots du titre ou de la description
* L’intitulé doit être évocateur même sorti du contexte.
* Une action à proposer ? Encouragez l’utilisateur à opérer avec des verbes comme “Créer”, “Essayer de”, “Supprimer”…
* Pas de point final, comme pour les titres.
