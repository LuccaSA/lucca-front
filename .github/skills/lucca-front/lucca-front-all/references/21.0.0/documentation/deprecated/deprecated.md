# Liste des éléments dépréciés

## Composants

| Nom | Depuis  | Suppression | Action à réaliser |
| --- | --- | --- | --- |
| Deprecated Filter bar | 19.2 | 22.0 | À remplacer par Filter Pills & Filter Bar. |
| List | - | Non défini | À remplacer par Sortable list. |
| Select et variations (API, Establishement, Department, User, Qualification, etc.) | 17.3 | Non défini | À remplacer par Simple & Multiple Select et leurs directives - Schematics |
| `<lu-dropdown>` | 20.3 | Non défini | À remplacer par un template, comme présenté sur l'exemple de la page Dropdown. |
| Deprecated Checkbox | - | Non défini | À remplacer par Checkbox. |
| Deprecated Radio | - | Non défini | À remplacer par Radio. |
| Deprecated Switch | - | Non défini | À remplacer par Switch. |
| Radio buttons | - | Non défini | À remplacer par Radio. |
| Deprecated Textfield | - | Non défini | À remplacer par Textfield. |
| Date picker | - | Non défini | À remplacer par Date input. |
| Deprecated File upload | - | Non défini | À remplacer par File upload. |
| Label  | - | Non défini | À remplacer par Chip, Tag ou Numeric badge. |
| Popover | - | Non défini | À remplacer par Popover2. |
| Side panel | - | Non défini | À remplacer par Dialog. |
| Table | - | Non défini | À remplacer par Date table ou Index table. |

## Classes & inputs

| Nom | Depuis | Suppression | Action à réaliser |
| --- | --- | --- | --- |
| `.palette-grey` | 17.3 | 22.0 | À remplacer par `.palette-neutral`- Schematics |
| `.palette-primary` & `.palette-secondary` | 17.3 | 22.0 | À remplacer par `.palette-product`- Schematics |
| `.palette-lucca` | 17.3 | 22.0 | À remplacer par `.palette-brand` - Schematics |
| `.u-textLeft` `.u-textCenter` `.u-textRight`  | 18.1 | 22.0 | Doublon. À remplacer par :  `.u-textAlignLeft` `.u-textAlignCenter`  `.u-textAlignRight`  |
| `.dialog-form` & `.dialog-formOptional` | 18.3 | 22.0 | À remplacer par la classe unique `.dialog-inside-formOptional` |
| `.lu-dropdown-[...]` | 19.2 | 22.0 | À remplacer par le nouveau DOM du composant Dropdown. |
| `.menu` & `.menu-[...]` | 19.3 | 22.0 | À remplacer par Horizontal navigation. |
| `.u-textXS`, `.u-textS`, `.u-textM`, `.u-textL`, `.u-textXL`, `.u-textXXL`& `.u-textXXXL`  | 20.1 | 22.0 | À remplacer par les classes `.pr-u-bodyXS`, `.pr-u-bodyS`, `.pr-u-bodyM`. Les utilitaires `L` ~ `XXXL` peuvent être remplacés par un utilitaire de titre `.pr-u-hx` ou le token typographie correspondant. [Plus d'informations sur le sujet](https://www.notion.so/luccasoftware/Tokens-Typo-1ebd278ab26e808a9b58d1017514ecb9). |
| Classes pour button `.mod-text` & `.mod-deleted`  et inputs Angular `delete`, `text` & `text-invert`. | 20.2 | 22.0 | À remplacer par les classes `.mod-ghost` & `.mod-critical` et les inputs Angular `critical`, `ghost` & `ghost-invert` |
| Classes utilitaires de couleur de texte`.pr-u-textLight`, `.pr-u-textProduct`, etc. ([Liste complète](https://www.notion.so/luccasoftware/Utilitaires-color-text-2c7d278ab26e808b9d61f3734eeb77a2))  | 21.0 | Non défini | À remplacer par les nouvelles classes liées aux tokens (`.pr-u-color...`) - Schematics |

## Variables CSS

| Nom | Depuis | Suppression | Action à réaliser |
| --- | --- | --- | --- |
| `--palettes-grey-XXX` | 17.3 | 22.0 | À remplacer par `--palettes-neutral-XXX` - Schematics |
| `--palettes-primary-XXX` & `--palettes-secondary-XXX` | 17.3 | 22.0 | À remplacer par `--palettes-product-XXX` - Schematics |
| `--palettes-lucca-XXX` | 17.3 | 22.0 | À remplacer par `--palettes-brand-XXX` - Schematics |
| `--colors-white-color` | 18.2 | 22.0 | À remplacer par `--palettes-neutral-0` ou `--pr-t-elevation-surface-raised` selon si la couleur en question est considérée comme une couleur ou une surface. |
| `--colors-black-color` | 18.2 | 22.0 | À remplacer par `--palettes-neutral-900` |
| `--commons-borderRadius-XXX` | 20.2 | 22.0 | À remplacer par `--pr-t-border-radius-XXX` - Schematics |

---

# Liste des éléments supprimés

## LF 20.1

### Composants

| Nom | Remplacement |
| --- | --- |
| Qualification picker | Remplacer le composant par les directives pour Simple & Multiple Select - Schematics |

### Classes

| Nom | Remplacement |
| --- | --- |
| Anciennes classes *User Tile* : `.user-info`, `.user-tile-title`, `.user-tile-label` & `.user-tile-footnote` | À replacer par le composant Angular ou les nouvelles classes HTML. |
| Les DOM des composants Angular `lu-user-tile` et `lu-user-picture` (`.user-info[...]`, `.user-tile[...]`, `.picture`...) ont été revus pour devenir disponibles sous forme de composants HTML. | À remplacer par le nouveau DOM des composants User Tile et Avatar. |
| `.mod-columnSticky` | Doublon. Seule la classe`.mod-stickyColumn` est conservée. |
| `.table-head-row-cell-sortableButton` `.indexTable-head-row-cell-sortableButton` `.table-head-row-cell.mod-sortable` `.table-head-row-cell.sortedAscending` `.table-head-row-cell.sortedDescending` | Remplacés par le sous-composant tableSortable commun à Table & Index table. |
| `.indexTable-body-row-cell-action` | Le DOM d'Index table a été mis à jour avec `.indexTable-body-row-cell-link` afin de fournir un véritable lien au composant. |
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
| Grid (deprecated) | Nouveau composant Grid. |
| Action icon | Suite à la fusion de *button* et *action icon* dans le design system, ce dernier devient un mod de *button* : `.button.mod-onlyIcon`.  |
| Empty state (deprecated) | Nouveau composant Empty state |

### Classes

| `.button.mod-icon` | `mod-icon` devient `mod-withIcon` afin d'éviter la confusion avec `mod-onlyIcon` suite à la fusion des composants *button* et *actionIcon.* |
| --- | --- |
| `.u-comma` | À remplacer par des virgules HTML pour des questions d'accessibilité. |
| `.u-unit` | Non remplacé (usage très faible), à basculer coté produit si nécessaire. |
| Anciens utilitaires spacings (`.u-marginTopXS`, `.u-paddingM`, `.u-gapS`, etc.) | À remplacer par le format apporté par les nouveaux tokens, ex : `.pr-u-marginTop100` - Schematics |
| `.u-elevateX` | À remplacer par les tokens elevations. |

### Variables CSS

| `--spacings-X` (XS, M, L, etc.) | À remplacer par `--pr-t-spacings-XXX` (50, 100, 500, etc.) - Schematics |
| --- | --- |
| `--commons-boxShadow-XXX` | À remplacer par les tokens elevations. |
| `--commons-elevations-elevation-X` | À remplacer par les tokens elevations. |

## LF 18.1

### Composants

| Nom | Remplacement |
| --- | --- |
| Status | Nouveau composant Status badge |
| Override composants Material  (autocomplete, buttons, datepicker, dialog, input, menu, mixins, options, select, tooltip) | Ces feuilles de style n'étaient plus actives depuis plusieurs versions. Elles ont progressivement été remplacées par des composants LF. |

### Classes

| `.button.mod-counter` | Classe inutile depuis l'utilisation du composant Numeric badge. Voir l'exemple. |
| --- | --- |
| `.button-counter` | Remplacé par Numeric badge. Voir l'exemple. |
| `.navSide-item-alert` | Remplacé par Numeric badge et New badge. Voir l'exemple. |
| `.textfield-actionClear` | Remplacé par le composant Clear. Voir l'exemple. |
| `.lu-select-value .label` (Comme compteur de select multiple) | Remplacé par Numeric badge ou par le sous-composant dédié de Select Multiple. (Ajouter lien) |
| `.callout.mod-tiny` | Remplacé par le composant Callout popover. |