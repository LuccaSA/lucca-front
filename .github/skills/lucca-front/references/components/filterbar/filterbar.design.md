# filterbar — Design Guidelines

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/13044b)

# Design

**Mots-clés :**barre, filtres, pills

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

☝️ Si vous souhaitez en savoir plus sur son utilisation au sein d’une interface, son positionnement et les spécifications Design, rendez-vous en bas de cette page.

## Comportement

Une guideline dédiée aux vues et disponible dans la section « Design patterns ».

### Vues avec compteur

Lorsqu’un compteur est affiché dans le SegmentedControl utilisé pour les vues, il indique le nombre d’objets présent dans cette vue.

Si des filtres sont appliqués, cela n’a pas d’impact sur le nombre indiqué dans le NumericBadge.

### Vues personnalisées

Pour les cas d’usages nécessitant des filtrages récurrents, il est recommandé de permettre à l'utilisateur d'enregistrer ses configurations pour qu'elles soient persistées. Pour en savoir plus sur la gestion de ces états, référez-vous au pattern Vues et filtres.

### Ajout de filtres supplémentaires

Des filtres supplémentaires, masqués derrière un bouton, peuvent être affichés si l’utilisateur souhaite affiner les résultats.

Les FilterPills ajoutés s’affichent au fur et à mesure que l’utilisateur les sélectionne. Si la liste de filtres affichés est longue, les FilterPills passent automatiquement à la ligne.

Il n’est pas possible de masquer un filtre affiché par défaut. Ces derniers ne sont donc pas présent dans la liste des filtres.

Si l'utilisateur décide de masquer un filtre actif, ce dernier sera désactivé.

### Actions associées

Les boutons d’action, typiquement pour exporter ou télécharger le contenu filtré sous un format spécifique, sont toujours placés à droite de la FilterBar.

Ces actions sont ferrées à droite de l’interface, pour les détacher des filtres.

### Application des filtres

Par défaut, les filtres **s’appliquent automatiquement** lorsque l’utilisateur les sélectionne/désélectionne. Un état de chargement au niveau du contenu indique à l’utilisateur que le calcul des résultats est en cours (Skeleton, Loader, etc.)

Dans certains cas, en raison de contraintes techniques, les filtres nécessitent un bouton pour être appliqués. Ce bouton s’affiche à la toute fin de la FilterBar.

### Affichage du nombre de résultats

Lorsqu’il est intéressant d’indiquer à l’utilisateur le nombre de résultats, cette information peut être affichée à la toute fin de la FilterBar.

### Vues affichées à droite

Les vues peuvent fonctionner comme des onglets, par exemple pour proposer un affichage différent pour un même jeu de ressource (en IndexTable ou en CardWrapper). Dans ce cas, les vues sont affichées à droite de la FilterBar.

Il n'est pas possible de cumuler des vues à gauche et des vues à droite.

### Filtres dépendants d’une vue

Lorsque vues et FilterPills sont cumulés, les FilterPills sont, par défaut, visibles pour chacune des vues disponibles.

Cependant, dans de rares cas, nous souhaitons restreindre les options de filtrages pour certaines vues. Dans ce cas, les FilterPills peuvent alors s’afficher ou se masquer en fonction de la vue sélectionnée par l’utilisateur.

### Filtres, tableau, pagination et sélection

Lorsque des filtres sont appliqués sur un tableau paginé, ils restent appliqués lorsque l’utilisateur navigue de page en page.

En revanche, comme mentionné dans les comportements des IndexTable, lorsque l’utilisateur a sélectionné plusieurs objets d’un même tableau et qu’il y applique des filtres, la sélection se réinitialise.

## Règles d'utilisation

### La FilterBar doit être utilisée pour filtrer un DataTable ou IndexTable

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
