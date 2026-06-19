---
title: Cycle de vie des composants
description: De "New" à "Deprecated", nos composants répondent à un cycle de vie afin de simplifier la mise à jour du Design System au sein des produits.
---

# Liste des éléments supprimés

## LF 20.1

### Composants

| Nom | Remplacement |
| --- | --- |
| Qualification picker | Remplacer le composant par les directives pour [Simple](https://prisme.lucca.io/94310e217/p/587833-select-simple/b/991e87) & [Multiple Select](https://prisme.lucca.io/94310e217/p/927519-select-multiple-new/b/39e067) - [Schematics](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants) |

### Classes

| Nom | Remplacement |
| --- | --- |
| Anciennes classes *User Tile* : `.user-info`, `.user-tile-title`, `.user-tile-label` & `.user-tile-footnote` | À replacer par le [composant Angular](https://prisme.lucca.io/94310e217/p/56d611-user-tile/b/00d3d8) ou les [nouvelles classes HTML](https://prisme.lucca.io/94310e217/p/56d611-user-tile/b/771576). |
| Les DOM des composants Angular `lu-user-tile` et `lu-user-picture` (`.user-info[...]`, `.user-tile[...]`, `.picture`...) ont été revus pour devenir disponibles sous forme de composants HTML. | À remplacer par le nouveau DOM des composants [User Tile](https://prisme.lucca.io/94310e217/p/56d611-user-tile/b/771576) et [Avatar](https://prisme.lucca.io/94310e217/p/42b330-avatar/b/915f82). |
| `.mod-columnSticky` | Doublon. Seule la classe`.mod-stickyColumn` est conservée. |
| `.table-head-row-cell-sortableButton` `.indexTable-head-row-cell-sortableButton` `.table-head-row-cell.mod-sortable` `.table-head-row-cell.sortedAscending` `.table-head-row-cell.sortedDescending` | Remplacés par le sous-composant tableSortable commun à [Table](https://prisme.lucca.io/94310e217/p/75b1ea-table/t/page-75b1ea-67463914-5) & [Index table](https://prisme.lucca.io/94310e217/p/24fc14-index-table-new/t/page-24fc14-90701228-74b8e8-3). |
| `.indexTable-body-row-cell-action` | Le [DOM d'Index table](https://prisme.lucca.io/94310e217/p/24fc14-index-table-new/t/page-24fc14-90530446-74b8e8-2) a été mis à jour avec `.indexTable-body-row-cell-link` afin de fournir un véritable lien au composant. |
| `.comment-content-textContainer` | À remplacer par la classe `.comment-content-textContainerOptional` |

### Mixins

| Nom | Remplacement |
| --- | --- |
| `userTileStyle` | Remplacer par l'appel du composant SCSS `@forward '@lucca-front/scss/src/components/userTile';` |
| `userPictureStyle` `userPictureVars` | Remplacer par l'appel du composant SCSS `@forward '@lucca-front/scss/src/components/avatar';` |

## LF 19.1

### Composants

| Nom | Remplacement |
| --- | --- |
| Grid (deprecated) | Nouveau composant [Grid](https://prisme.lucca.io/94310e217/p/955d69-grid). |
| Action icon | Suite à la fusion de *button* et *action icon* dans le design system, ce dernier devient un mod de *button* : `.button.mod-onlyIcon`.  |
| Empty state (deprecated) | Nouveau composant [Empty state](https://prisme.lucca.io/94310e217/p/77bb47-empty-state) |

### Classes

| `.button.mod-icon` | `mod-icon` devient `mod-withIcon` afin d'éviter la confusion avec `mod-onlyIcon` suite à la fusion des composants *button* et *actionIcon.* |
| --- | --- |
| `.u-comma` | À remplacer par des virgules HTML pour des questions d'accessibilité. |
| `.u-unit` | Non remplacé (usage très faible), à basculer coté produit si nécessaire. |
| Anciens utilitaires spacings (`.u-marginTopXS`, `.u-paddingM`, `.u-gapS`, etc.) | À remplacer par le format apporté par les nouveaux tokens, ex : `.pr-u-marginTop100` - [Schematics](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256) |
| `.u-elevateX` | À remplacer par les tokens [elevations](https://prisme.lucca.io/94310e217/p/673d94-elevations/b/043449). |

### Variables CSS

| `--spacings-X` (XS, M, L, etc.) | À remplacer par `--pr-t-spacings-XXX` (50, 100, 500, etc.) - [Schematics](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256) |
| --- | --- |
| `--commons-boxShadow-XXX` | À remplacer par les tokens [elevations](https://prisme.lucca.io/94310e217/p/673d94-elevations/b/043449). |
| `--commons-elevations-elevation-X` | À remplacer par les tokens [elevations](https://prisme.lucca.io/94310e217/p/673d94-elevations/b/043449). |

## LF 18.1

### Composants

| Nom | Remplacement |
| --- | --- |
| [Status](https://prisme.lucca.io/94310e217/p/569078-status) | Nouveau composant [Status badge](https://prisme.lucca.io/94310e217/p/425d98-status-badge) |
| Override composants Material  (autocomplete, buttons, datepicker, dialog, input, menu, mixins, options, select, tooltip) | Ces feuilles de style n'étaient plus actives depuis plusieurs versions. Elles ont progressivement été remplacées par des composants LF. |

### Classes

| `.button.mod-counter` | Classe inutile depuis l'utilisation du composant [Numeric badge](https://prisme.lucca.io/94310e217/p/0548ef-numeric-badge). [Voir l'exemple](https://prisme.lucca.io/94310e217/p/098404-button/t/page-098404-82776006-50af19-6). |
| --- | --- |
| `.button-counter` | Remplacé par [Numeric badge](https://prisme.lucca.io/94310e217/p/0548ef-numeric-badge). [Voir l'exemple](https://prisme.lucca.io/94310e217/p/098404-button/t/page-098404-82776006-50af19-6). |
| `.navSide-item-alert` | Remplacé par [Numeric badge](https://prisme.lucca.io/94310e217/p/0548ef-numeric-badge) et [New badge](https://prisme.lucca.io/94310e217/p/36bcdf-new-badge). [Voir l'exemple](https://prisme.lucca.io/94310e217/p/160093-secondary-menu). |
| `.textfield-actionClear` | Remplacé par le composant [Clear](https://prisme.lucca.io/94310e217/p/80fb2d-clear). [Voir l'exemple](https://prisme.lucca.io/94310e217/p/55f101-text-field-deprecated/t/page-55f101-47914164-17). |
| `.lu-select-value .label` (Comme compteur de select multiple) | Remplacé par [Numeric badge](https://prisme.lucca.io/94310e217/p/0548ef-numeric-badge) ou par le sous-composant dédié de Select Multiple. (Ajouter lien) |
| `.callout.mod-tiny` | Remplacé par le composant [Callout popover](https://prisme.lucca.io/94310e217/p/64c8d8-callout). |
