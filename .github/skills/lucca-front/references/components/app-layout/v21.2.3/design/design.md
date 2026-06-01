# app-layout — Design

Mots-clés : application, mise en page, structure

## Structure globale de l’application

Le layout de base d’une application Lucca, `AppLayout`, est composé de trois zones principales :

* **Banner** : en-tête fixe et transverse à toutes les applications Lucca permettant de naviguer entre les différentes applications.
* **Side navigation** : menu de navigation latéral, fixe à gauche de l’écran permettant de naviguer entre les différentes sections d’une application.
* **Main layout** : zone principale de l’interface avec laquelle l’utilisateur interagit pour réaliser ses tâches.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5568:7001">

</design>

## Principes de construction du layout

### Marges

Les marges ne sont pas portées par le composant `AppLayout`.

Le contenu principal de l'interface, à l'intérieur du `MainLayout`, doit être positionné à 24px du haut et du bas, et à 32px des bords gauche du conteneur.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5568:6960">

</design>

Sur navigateur mobile ou lorsque le viewport est inférieur à 640px, les marges sont réduites pour pouvoir optimiser l’affichage du contenu. Elles sont donc de 16px.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5568:7011">

</design>

### Espacements

Les différentes sections du contenu de l’interface sont séparées par un espacement de 24px. À l’intérieur de ces sections, l’espacement entre les différents éléments est de 16px.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5568:7045">

</design>

### Largeur maximale

Pour garantir une lisibilité optimale, la largeur maximale des applications est fixée à 1600px navigation comprise. Cela permet à l’utilisateur de ne pas se perdre sur une interface.

Le contenu des éléments comme le Banner ou le Footer suit les mêmes directives, même si la largeur de ces composants prend toute la largeur disponible (arrière-plan, ombres, bordures, etc.).

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5568:7412">

</design>

Certaines vues spécifiques peuvent dépasser cette largeur et prendre toute la place disponible (affiche d’un rapport ou d’un calendrier par exemple). Si d’autres élément sont présents sur l’interface, ces derniers respectent tout de même les contraintes de largeur.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5568:7488">

</design>

### Débordement et défilement

#### Défilement vertical

Le défilement vertical se fait au niveau du `MainLayout`. De cette manière, il est possible de défiler avec la molette de la souris même au survol des éléments sticky (PageHeader, Footer, etc.).

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5568:7517">

</design>

#### Défilement horizontal

Comme pour le défilement vertical, le défilement horizontal se fait au niveau du `MainLayout`. La barre de défilement s’affiche donc tout en bas de l’écran et est accessible à tout moment.

Lorsque l’utilisateur défile horizontalement, les éléments qui ne débordent pas de l’écran restent figés à leur place.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5568:7246">

</design>

- **Don't** : Nous n’affichons pas la barre de défilement au niveau de l’élément. Cela génère des problèmes d’expérience pour les utilisateurs si celle-ci se trouve en dehors du champ visible.

### Eléments sticky

Les éléments sticky sont des composants qui restent visibles à l'écran même lorsque l'utilisateur fait défiler la page. Ces éléments peuvent être utiles pour fournir un accès rapide à des fonctionnalités importantes, comme la navigation ou les actions principales.

Cependant, il est important de les utiliser avec parcimonie pour ne pas surcharger l'interface et préserver une expérience utilisateur optimale.

- **Do** : Ne gardons sticky que les éléments essentiels à une bonne utilisation de l’interface par l’utilisateur.
- **Don't** : Ne surchargeons pas l’interface en cumulant des éléments sticky. La zone utile pour l’utilisateur s’en trouve réduite et dégrade l’expérience.
- **Do** : Sur navigateur mobile ou lorsque le viewport est inférieur à 640px, seuls le banner, le menu de navigation et footer sont toujours visibles. Les autres éléments défilent.
