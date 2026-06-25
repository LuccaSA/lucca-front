---
title: Cycle de vie des composants
description: De "New" à "Deprecated", nos composants répondent à un cycle de vie afin de simplifier la mise à jour du Design System au sein des produits.
---

# Liste des éléments dépréciés

## Composants

| Nom | Depuis  | Suppression | Action à réaliser |
| --- | --- | --- | --- |
| Deprecated [Filter bar](https://prisme.lucca.io/94310e217/p/334d4a-filter-bar) | 19.2 | 22.0 | À remplacer par [Filter Pills](https://prisme.lucca.io/94310e217/p/053be4-filter-pill) & [Filter Bar](https://prisme.lucca.io/94310e217/p/13044b-filter-bar-). |
| [List](https://prisme.lucca.io/94310e217/p/66df2f-list) | - | Non défini | À remplacer par [Sortable list](https://prisme.lucca.io/94310e217/p/883e34-sortable-list). |
| [Select](https://prisme.lucca.io/94310e217/p/717b6d-select-deprecated) et variations ([API](https://prisme.lucca.io/94310e217/p/699694-api-select), [Establishement](https://prisme.lucca.io/94310e217/p/70d7eb-establishment), [Department](https://prisme.lucca.io/94310e217/p/479237-department-select-), [User](https://prisme.lucca.io/94310e217/p/691517-select), [Qualification](https://prisme.lucca.io/94310e217/p/69f87f-qualification), etc.) | 17.3 | Non défini | À remplacer par [Simple](https://prisme.lucca.io/94310e217/p/587833-select-simple) & [Multiple Select](https://prisme.lucca.io/94310e217/p/927519-select-multiple-new) et leurs directives - [Schematics](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants) |
| `<lu-dropdown>` | 20.3 | Non défini | À remplacer par un template, comme présenté sur l'exemple de la page [Dropdown](https://prisme.lucca.io/94310e217/p/557682-dropdown). |
| Deprecated [Checkbox](https://prisme.lucca.io/94310e217/p/04061d-checkbox) | - | Non défini | À remplacer par [Checkbox](https://prisme.lucca.io/94310e217/p/42c88e-checkbox). |
| Deprecated [Radio](https://prisme.lucca.io/94310e217/p/07849c-radio) | - | Non défini | À remplacer par [Radio](https://prisme.lucca.io/94310e217/p/45f82a-radio). |
| Deprecated [Switch](https://prisme.lucca.io/94310e217/p/15149b-switch) | - | Non défini | À remplacer par [Switch](https://prisme.lucca.io/94310e217/p/39c7b7-switch). |
| [Radio buttons](https://prisme.lucca.io/94310e217/p/55805e-radio-buttons) | - | Non défini | À remplacer par [Radio](https://prisme.lucca.io/94310e217/p/45f82a-radio). |
| Deprecated [Textfield](https://prisme.lucca.io/94310e217/p/55f101-text-field) | - | Non défini | À remplacer par [Textfield](https://prisme.lucca.io/94310e217/p/459eda-textfield). |
| [Date picker](https://prisme.lucca.io/94310e217/p/10c73a-date-picker) | - | Non défini | À remplacer par [Date input](https://prisme.lucca.io/94310e217/p/87a48d-date-picker). |
| Deprecated [File upload](https://prisme.lucca.io/94310e217/p/99e88e-file-upload) | - | Non défini | À remplacer par [File upload](https://prisme.lucca.io/94310e217/p/8282a5-file-upload). |
| [Label](https://prisme.lucca.io/94310e217/p/640fae-label)  | - | Non défini | À remplacer par [Chip](https://prisme.lucca.io/94310e217/p/3960bc-chip), [Tag](https://prisme.lucca.io/94310e217/p/6036ad-tag) ou [Numeric badge](https://prisme.lucca.io/94310e217/p/0548ef-numeric-badge). |
| [Popover](https://prisme.lucca.io/94310e217/p/7693f3-popover) | - | Non défini | À remplacer par [Popover2](https://prisme.lucca.io/94310e217/p/129fae-popover). |
| [Side panel](https://prisme.lucca.io/94310e217/p/863d99-side-panel) | - | Non défini | À remplacer par [Dialog](https://prisme.lucca.io/94310e217/p/841b0b-dialogs). |
| [Table](https://prisme.lucca.io/94310e217/p/75b1ea-table-) | - | Non défini | À remplacer par [Date table](https://prisme.lucca.io/94310e217/p/4263a5-data-table) ou [Index table](https://prisme.lucca.io/94310e217/p/24fc14-index-table). |

## Classes & inputs

| Nom | Depuis | Suppression | Action à réaliser |
| --- | --- | --- | --- |
| `.palette-grey` | 17.3 | 22.0 | À remplacer par `.palette-neutral`- [Schematics](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256) |
| `.palette-primary` & `.palette-secondary` | 17.3 | 22.0 | À remplacer par `.palette-product`- [Schematics](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256) |
| `.palette-lucca` | 17.3 | 22.0 | À remplacer par `.palette-brand` - [Schematics](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256) |
| `.u-textLeft` `.u-textCenter` `.u-textRight`  | 18.1 | 22.0 | Doublon. À remplacer par :  `.u-textAlignLeft` `.u-textAlignCenter`  `.u-textAlignRight`  |
| `.dialog-form` & `.dialog-formOptional` | 18.3 | 22.0 | À remplacer par la classe unique `.dialog-inside-formOptional` |
| `.lu-dropdown-[...]` | 19.2 | 22.0 | À remplacer par le nouveau DOM du composant [Dropdown](https://prisme.lucca.io/94310e217/p/557682-dropdown). |
| `.menu` & `.menu-[...]` | 19.3 | 22.0 | À remplacer par [Horizontal navigation](https://prisme.lucca.io/94310e217/p/29aaef-horizontal-navigation). |
| `.u-textXS`, `.u-textS`, `.u-textM`, `.u-textL`, `.u-textXL`, `.u-textXXL`& `.u-textXXXL`  | 20.1 | 22.0 | À remplacer par les classes `.pr-u-bodyXS`, `.pr-u-bodyS`, `.pr-u-bodyM`. Les utilitaires `L` ~ `XXXL` peuvent être remplacés par un utilitaire de titre `.pr-u-hx` ou le [token typographie](https://prisme.lucca.io/94310e217/p/73bd2f-typographie/b/23f311) correspondant. [Plus d'informations sur le sujet](https://www.notion.so/luccasoftware/Tokens-Typo-1ebd278ab26e808a9b58d1017514ecb9). |
| Classes pour button `.mod-text` & `.mod-deleted`  et inputs Angular `delete`, `text` & `text-invert`. | 20.2 | 22.0 | À remplacer par les classes `.mod-ghost` & `.mod-critical` et les inputs Angular `critical`, `ghost` & `ghost-invert` |
| Classes utilitaires de couleur de texte`.pr-u-textLight`, `.pr-u-textProduct`, etc. ([Liste complète](https://www.notion.so/luccasoftware/Utilitaires-color-text-2c7d278ab26e808b9d61f3734eeb77a2))  | 21.0 | Non défini | À remplacer par les [nouvelles classes](https://prisme.lucca.io/94310e217/p/21a286-utilitaires) liées aux tokens (`.pr-u-color...`) - [Schematics](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/17d7fdfdaf) |

## Variables CSS

| Nom | Depuis | Suppression | Action à réaliser |
| --- | --- | --- | --- |
| `--palettes-grey-XXX` | 17.3 | 22.0 | À remplacer par `--palettes-neutral-XXX` - [Schematics](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256) |
| `--palettes-primary-XXX` & `--palettes-secondary-XXX` | 17.3 | 22.0 | À remplacer par `--palettes-product-XXX` - [Schematics](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256) |
| `--palettes-lucca-XXX` | 17.3 | 22.0 | À remplacer par `--palettes-brand-XXX` - [Schematics](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/b/15c256) |
| `--colors-white-color` | 18.2 | 22.0 | À remplacer par `--palettes-neutral-0` ou `--pr-t-elevation-surface-raised` selon si la couleur en question est considérée comme une couleur ou une surface. |
| `--colors-black-color` | 18.2 | 22.0 | À remplacer par `--palettes-neutral-900` |
| `--commons-borderRadius-XXX` | 20.2 | 22.0 | À remplacer par `--pr-t-border-radius-XXX` - [Schematics](https://prisme.lucca.io/94310e217/p/40c515-cycle-de-vie-des-composants/t/page-40c515-88288181-15c256-0) |
