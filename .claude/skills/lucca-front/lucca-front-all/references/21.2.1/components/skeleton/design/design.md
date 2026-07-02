# skeleton — Design

Le Skeleton est un composant visuel temporaire qui imite la structure de la page finale en cours de chargement. Il projette l'utilisateur dans l'interface à venir, rendant l'attente plus active et fluide. Les composants les plus utilisés possèdent leur état skeleton.

## Skeleton item

La SkeletonItem simule des lignes de texte ou des éléments structurels. C’est la brique de base indispensable à partir de laquelle tous les composants de Skeleton plus complexes sont construits.

### Style

Une animation de balayage (un dégradé qui se déplace de gauche à droite) indique visuellement à l'utilisateur que l'application est en train de charger.

Le composant comporte deux dégradés :

* `--pr-t-skeleton-light` : À utiliser sur les fonds blancs.
* `--pr-t-skeleton-dark` : À utiliser sur les fonds gris.

Pour maintenir la cohérence visuelle de l’interface, la hauteur et la forme de la SkeletonItem doivent s'aligner sur le composant ou le texte qu'elles remplacent.

Les variantes géométriques `circle`et `square`ne représentent pas du texte mais des éléments décoratifs.

## Composants

### Button

Le Skeleton utilisé pour le Button utilise simplement le SkeletonItem de type `body-M` , `body-S` ou `body-XS` selon la taille du Button attendu sur l’interface.

Le même Skeleton doit être utilisé pour tous les types de Button.

### HighlightData

### Page header

Le Skeleton du PageHeader représente le titre de la page ainsi qu’un Button. Cela correspond à la majorité des interfaces de nos logiciels. Nous n’affichons pas de Skeleton pour les sous-titres ou autres éléments, nous restons simples et épurés.

### Index table et Data table

Le Skeleton des tableaux (IndexTable et DataTable) doivent contenir **8 lignes**. Il est possible d’adapter ce nombre en fonction des besoins.

Concernant les colonnes, on prendra le nombre minimum de colonnes possibles qui peuvent être affichées dans le tableau.

L'en-tête et le contenu du tableau doivent être affichés en même temps au chargement d'une page.

Une fois le tableau chargé, si l’utilisateur modifie des filtres ou change de page, seul les lignes et le composant Pagination passent au format Skeleton.

Les entêtes de colonnes affichent le texte déjà chargé.

Si le tableau est paginé avec un scroll infini, nous faisons apparaître une ligne supplémentaire en Skeleton à la fin du tableau pour indiquer à l'utilisateur qu'un chargement vient d'être lancé.

### Card

Le Skeleton Card doit être utilisé pour tous les composant ressemblant à des Card (ResourceCard, ApprobationItem, etc.). Il représente le titre de la ressource et une ligne de sous-texte.

Lorsque plusieurs ressources sont attendus dans la page, il est possible d’utiliser un Skeleton pour le composant ResourceCardWrapper.

Dans un affichage en grille, il faut représenter une ligne complète plus une ressource sur la deuxième ligne.

Dans un affichage en liste, le Skeleton doit représenter 4 resources.

De la même manière que pour les tableaux, si le contenu de la page est paginé et utilise du scroll infini, alors nous affichons un Skeleton de Card en bas de page lorsque le chargement d'une page supplémentaire est lancé.

### Highlight data

Le Skeleton du HighlightData représente un label et une donnée. Un Skeleton différent doit être appliqué en fonction du thème du HighlightData (`dark`, `light`, `white`).

### Fancy box

Le Skeleton de la FancyBox représente un label et une donnée.

### Form field

Un seul Skeleton existe pour les champs de formulaire (Select, Textfield, etc.). Il représente le label et le champ de saisi.

### Dialog

Concernant le composant Dialog, il est intéressant de garder du contexte. Pour cela, nous affichons directement le titre de la Dialog et la croix de fermeture. Cela permet notamment à l’utilisateur, si besoin, de fermer la Dialog avant même le chargement complet des données.

Le contenu de la Dialog et du Footer doit en revanche afficher un Skeleton, représentant les données attendus (formulaires, etc.).
