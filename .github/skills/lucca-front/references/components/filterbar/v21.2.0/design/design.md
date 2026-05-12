# filterbar — Design

**Mots-clés :**barre, filtres, pills

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

<notes>

1. **Vues :** Elles permettent d’afficher des contenus prédéfinis pour simplifier l’expérience de l’utilisateur. C’est le composant Segmented control qui est utilisé.
2. **Bouton d’ajout de filtres :** Ce bouton permet d’afficher une liste filtres masqués par défaut. L’utilisateur peut alors sélectionner les filtres qu’il souhaite utiliser pour affiner les résultats. Cette option est détaillé plus bas.
3. **Filtres :** La liste des filtres avec lesquels l’utilisateur peut interagir pour affiner sa recherche. Chaque filtre est représenté par une Filter pill.
4. **Barre de recherche :** La barre de recherche fonctionne comme un filtre supplémentaire. Elle permet de rechercher un contenu spécifique au sein des données déjà filtrées. Elle se positionne toujours en dernière.
5. **Actions associées :** Les boutons d’action associées, typiquement pour exporter ou télécharger le contenu filtré sous un format spécifique, sont toujours placés à droite de la Filter bar. Cette option est détaillé plus bas.

</notes>

☝️ Si vous souhaitez en savoir plus sur son utilisation au sein d’une interface, son positionnement et les spécifications Design, rendez-vous en bas de cette page.

## Comportement

### Vues avec compteur

Lorsqu’un compteur est affiché dans le Segmented control utilisé pour les vues, il indique le nombre d’objets présent dans cette vue.

Si des filtres sont appliqués, cela n’a pas d’impact sur le nombre indiqué dans le Numeric badge.

---

### Ajout de filtres supplémentaires

Des filtres supplémentaires, masqués derrière un bouton, peuvent être affichés si l’utilisateur souhaite affiner les résultats.

Les Filter pills ajoutés s’affichent au fur et à mesure que l’utilisateur les sélectionne. Si la liste de filtres affichés est longue, les Filter pills passent automatiquement à la ligne.

Il n’est pas possible de masquer un filtre affiché par défaut. Ces derniers ne sont donc pas présent dans la liste des filtres.

### Actions associées

Les boutons d’action, typiquement pour exporter ou télécharger le contenu filtré sous un format spécifique, sont toujours placés à droite de la Filter bar.

Ces actions sont ferrées à droite de l’interface, pour les détacher des filtres.

### Application des filtres

Par défaut, les filtres **s’appliquent automatiquement** lorsque l’utilisateur les sélectionne/désélectionne. Un état de chargement au niveau du contenu indique à l’utilisateur que le calcul des résultats est en cours (skeleton, loader, etc.)

Dans certains cas, en raison de contraintes techniques, les filtres nécessitent un bouton pour être appliqués. Ce bouton s’affiche à la toute fin de la FilterBar.

### Affichage du nombre de résultats

Lorsqu’il est intéressant d’indiquer à l’utilisateur le nombre de résultats, cette information peut être affichée à la toute fin de la Filter bar.

### Vues et filtres inactifs

Lorsqu’une vue représente un état prédéfini des données, basé sur un ensemble de filtres actifs. Lorsqu’une vue est sélectionnée, ces filtres sont affichés mais inactif. L’utilisateur ne peut pas les modifier.

Une vue “Tous” doit être disponible pour que l’utilisateur puisse filtrer comme il l’entend parmi l’ensemble des données.

### Filtres dépendants d’une vue

Lorsque vues et Filter pills sont cumulés, les Filter pills sont, par défaut, visibles pour chacune des vues disponibles.

Cependant, dans de rares cas, nous souhaitons restreindre les options de filtrages pour certaines vues. Dans ce cas, les Filter pills peuvent alors s’afficher ou se masquer en fonction de la vue sélectionnée par l’utilisateur.

---

### Filtres, tableau, pagination et sélection

Lorsque des filtres sont appliqués sur un tableau paginé, ils restent appliqués lorsque l’utilisateur navigue de page en page.

En revanche, comme mentionné dans les comportements des IndexTable, lorsque l’utilisateur a sélectionné plusieurs objets d’un même tableau et qu’il y applique des filtres, la sélection se réinitialise.

## Règles d'utilisation

### La Filter bar doit être utilisée pour filtrer un Data table ou Index table

La Filter bar est le composant standard pour permettre aux utilisateurs de filtrer les données affichées dans un tableau. Elle se positionne toujours au-dessus du tableau, entre le titre et les en-têtes de colonnes.

- **Do** : Positionnons les filtres dans une barre dédiée au-dessus du tableau.
- **Don't** : N'intégrons pas des champs de filtrage directement dans les en-têtes de colonnes.

## Spécifications

La Filter bar est positionnée sur une ligne dédiée. Elle peut se trouver :

* Directement entre l’entête et le contenu de la page, son impact aura un effet sur l’ensemble de la page.
* Dans une section spécifique de l’interface, auquel cas son impact sera restreint à cette section.

---

### Petits écrans et mobile

L’affichage de la Filter bar s’adapte en fonction de l’espace disponible et du device.

* Sur un écran de petite taille, sans écran tactile, les Filter pills passent automatiquement à la ligne en fonction de l’espace disponible.
* Lorsqu’il s’agit d’un écran tactile, les Filter pills restent affichées sur une seule et même ligne. L’utilisateur peut alors scroller horizontalement pour parcourir les filtres disponibles. Cela se rapproche d’un comportement plus commun de navigation sur téléphone.

---
