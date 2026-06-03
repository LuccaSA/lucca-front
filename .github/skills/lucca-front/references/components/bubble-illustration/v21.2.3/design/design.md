# bubble-illustration — Design

**Mots-clés :**illustration, bulle

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Couleurs

### Couleurs des logiciels

Les Bubbles illustrations doivent s'adapter automatiquement à la palette de couleurs du logiciel. Cela garantit une intégration harmonieuse et cohérente avec le reste de l'interface.

### Couleurs de feedback

Il est possible d’appliquer les couleurs de feedback dans certains contextes, notamment les Empty state, pour appuyer visuellement le message exposé à l'utilisateur.

## Cas d'usage

### File upload

Les Bubble Illustrations sont également utilisées pour enrichir visuellement les File upload. Cela permet de guider l’utilisateur en illustrant clairement la zone d’upload et dynamiser l’interface pour rendre l’action plus engageante.

L'illustration peut être modifiée en fonction de la nature des fichiers à importer (photographie, justificatif de dépense, archive, bulletins de paie, etc.).

### Empty state

Concernant les Empty state, nous distinguons plusieurs typologies de message dans lesquels les illustrations sont définies.

#### Aucun contenu

L'illustration est utilisée pour indiquer un état vide parce qu’aucune donnée n’existe et que l'utilisateur n'a pas la main pour en ajouter.

L'illustration affiche donc un objet représentant le type de ressource attendue.

#### Aucun contenu mais action possible

Dans certains cas, l’Empty state ne se limite pas à informer l’utilisateur d’une absence de contenu, mais doit aussi l’inciter à agir directement pour créer ou ajouter des ressources.

Nous ajoutons alors un petit symbole [+] sur l’illustration pour indiquer visuellement que l’utilisateur peut initier une action d’ajout ou de création.

Un bouton d'action doit aussi accompagner le message.

#### **Recherche sans résultat**

Cet état intervient lorsqu’un utilisateur effectue une recherche ou applique des filtres, mais qu'aucun élément ne correspond à ses critères.

L'illustration utilisée doit être `illustration-MagnifyingGlass`.

#### Erreur

Cette illustration signale qu’un problème technique ou fonctionnel empêche l’affichage des données.

L'illustration utilisée doit être `illustration-Error`.

#### Empty state positif (succès)

Dans ce contexte, l’absence de contenu est une bonne nouvelle : cela signifie que l’utilisateur a accompli ce qu’il devait faire. On profite donc de l'Empty state pour le féliciter.

Plusieurs illustrations sont disponibles pour indiquer des états de succès. Il est possible de choisir parmi ces trois illustrations : `illustration-Party`, `illustration-AwardRibbon` et `illustration-ThumbUp`

#### Message d'alerte

Cette catégorie est utilisée pour des situations où l’utilisateur doit être informé d’un état particulier nécessitant une vigilance ou une action.

L'illustration utilisée doit être `illustration-Warning`.
