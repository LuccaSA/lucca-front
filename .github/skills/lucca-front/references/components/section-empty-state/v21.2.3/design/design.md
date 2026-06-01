# section-empty-state — Design

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7258:20721">

</design>

**Mots-clés**vide, résultats, placeholder, section

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## **Anatomie**

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7258:18591">

<notes>

1. **Illustration** adapté au contexte de l’interface et du message
2. **Titre** du message
3. **Description** permettant à l’utilisateur de comprendre ce qu’il se passe et ce qu’il doit faire
4. **Boutons d’action** permettant à l’utilisateur d’interagir avec l’application

</notes>

</design>

## Illustrations

Les Bubbles illustrations doivent s'adapter automatiquement à la palette de couleurs du logiciel. Cela garantit une intégration harmonieuse et cohérente avec le reste de l'interface.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7389:20719">

</design>

## Typologie des messages

### Aucun contenu

L'Empty state est utilisé pour indiquer un état vide parce qu’aucune donnée n’existe et que l'utilisateur n'a pas la main pour en ajouter. Il n'y a donc pas de bouton d'actions.

L'illustration affiche donc un objet représentant le type de ressource attendue.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7389:20731">

</design>

### Aucun contenu mais action possible

Dans certains cas, l’Empty state ne se limite pas à informer l’utilisateur d’une absence de contenu, mais doit aussi l’inciter à agir directement pour créer ou ajouter des ressources.

Nous ajoutons alors un petit symbole [+] sur l’illustration pour indiquer visuellement que l’utilisateur peut initier une action d’ajout ou de création.

Un bouton d'action doit aussi accompagner le message.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7389:20733">

</design>

### **Recherche sans résultat**

Cet état intervient lorsqu’un utilisateur effectue une recherche ou applique des filtres, mais qu'aucun élément ne correspond à ses critères.

L'illustration utilisée doit être `illustration-MagnifyingGlass` et un bouton peut être ajouté au message pour réinitialiser rapidement les filtres.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7389:20735">

</design>

### Erreur

Cette état signale qu’un problème technique ou fonctionnel empêche l’affichage des données.

L'illustration utilisée doit être `illustration-Error`et un bouton peut être ajouté au message pour lancer à nouveau la requête.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7389:20737">

</design>

### Empty state positif (succès)

Dans ce contexte, l’absence de contenu est une bonne nouvelle : cela signifie que l’utilisateur a accompli ce qu’il devait faire. On profite donc de l'Empty state pour le féliciter.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7389:20741">

</design>

Plusieurs illustrations sont disponibles pour indiquer des états de succès. Il est possible de choisir parmi ces trois illustrations : `illustration-Party`, `illustration-AwardRibbon` et `illustration-ThumbUp`

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7389:20727">

</design>

### Message d'alerte

Cette catégorie est utilisée pour des situations où l’utilisateur doit être informé d’un état particulier nécessitant une vigilance ou une action.

L'illustration utilisée doit être `illustration-Warning`.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7389:20739">

</design>

### Message court

Lorsque le message est succinct, un titre n'est pas nécessaire. Il est envisageable de centrer à la fois l'illustration et le texte pour une présentation équilibrée.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7258:20629">

</design>

### Animation de chargement

L'Empty state peut aussi être utilisé pour indiquer un état de chargement. Dans ce cas, l'illustration est remplacée par une animation et le texte est aussi adapté.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7299:26378">

</design>
