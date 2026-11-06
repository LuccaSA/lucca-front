# filterbar — Design Guidelines

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/13044b)

# Design

**Mots-clés :**barre, filtres, pills

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

☝️ Si vous souhaitez en savoir plus sur son utilisation au sein d’une interface, son positionnement et les spécifications Design, rendez-vous en bas de cette page.

## Comportement

Le pattern Vues et affichages détaille le rôle des vues et des affichages, et la façon de choisir entre les deux.

### Vues avec compteur

Un compteur dans le SegmentedControl des vues indique le nombre d'objets de chaque vue. Les filtres appliqués ne changent pas ce nombre.

### Vues personnalisées

Quand l'utilisateur filtre souvent de la même façon, proposons-lui d'enregistrer sa configuration en vue personnalisée. Le pattern Vues et affichages détaille leur création et leur gestion.

### Ajout de filtres supplémentaires

Des filtres supplémentaires, masqués derrière un bouton, aident l'utilisateur à affiner les résultats. Les FilterPills ajoutées s'affichent au fur et à mesure qu'il les sélectionne. Si elles sont nombreuses, elles passent automatiquement à la ligne.

Un filtre affiché par défaut ne peut pas être masqué : il n'apparaît donc pas dans la liste des filtres supplémentaires. Si l'utilisateur masque un filtre actif, ce filtre est désactivé.

### **Tri et regroupement**

Le tri et le regroupement du contenu s'affichent sous la forme d'une FilterPill, dont le label indique « Trier par » ou « Grouper par ». Cette FilterPill se place toujours en dernière position, après les autres FilterPills et juste avant la barre de recherche s'il y en a une, pour ne pas interférer avec les filtres.

Quand la FilterBar propose les deux, « Trier par » vient avant « Grouper par ». Ces FilterPills ne font pas partie des réglages d'affichage, placés à droite de la FilterBar.

### Actions associées

Les boutons d'action, par exemple pour exporter ou télécharger le contenu filtré, se placent toujours à droite de la FilterBar, à l'écart des filtres. Quand la FilterBar propose des affichages, les actions se placent après eux, séparées par un Divider.

### Application des filtres

Par défaut, les filtres s'appliquent automatiquement dès que l'utilisateur les sélectionne ou les désélectionne. Un état de chargement sur le contenu (Skeleton, Loader…) indique que les résultats sont en cours de calcul.

Dans certains cas, des contraintes techniques imposent un bouton pour appliquer les filtres. Ce bouton se place à la toute fin de la FilterBar.

### Indicateur du nombre de résultats

Quand il est utile d'indiquer le nombre de résultats, cette information se place à la toute fin de la FilterBar.

### **Affichages**

Un SegmentedControl placé à droite de la FilterBar propose des affichages : il présente le même jeu de ressources sous une autre forme, par exemple en IndexTable ou en CardWrapper.

Ce n'est pas un filtre. La vue sélectionnée et les FilterPills actives s'appliquent de la même façon quel que soit l'affichage, et chaque élément garde les mêmes actions d'un affichage à l'autre. Le pattern « Vues et affichages » détaille ces règles.

Une même FilterBar peut cumuler vues et affichages : les vues restent à gauche, les affichages à droite.

### Filtres, tableau, pagination et sélection

Sur un tableau paginé, les filtres appliqués restent actifs quand l'utilisateur passe d'une page à l'autre.

En revanche, comme l'indiquent les comportements de l'IndexTable, quand l'utilisateur a sélectionné plusieurs objets d'un tableau puis applique des filtres, la sélection se réinitialise.

## Règles d'utilisation

### **Utilisons la FilterBar pour filtrer un DataTable ou un IndexTable**

La FilterBar est le composant standard pour permettre aux utilisateurs de filtrer les données affichées dans un tableau. Elle se positionne toujours au-dessus du tableau, entre le titre et les en-têtes de colonnes.

- **Do** : Positionnons les filtres dans une barre dédiée au-dessus du tableau.
- **Don't** : N'intégrons pas des champs de filtrage directement dans les en-têtes de colonnes.

## Spécifications

La FilterBar est positionnée sur une ligne dédiée. Elle peut se trouver :

* Directement entre l’entête et le contenu de la page, son impact aura un effet sur l’ensemble de la page.
* Dans une section spécifique de l’interface, auquel cas son impact sera restreint à cette section.

### Petits écrans et mobile

L’affichage de la FilterBar s’adapte en fonction de l’espace disponible et du device.

* Sur un écran de petite taille, sans écran tactile, les FilterPills passent automatiquement à la ligne en fonction de l’espace disponible.
* Lorsqu’il s’agit d’un écran tactile, les FilterPills restent affichées sur une seule et même ligne. L’utilisateur peut alors scroller horizontalement pour parcourir les filtres disponibles. Cela se rapproche d’un comportement plus commun de navigation sur téléphone.
