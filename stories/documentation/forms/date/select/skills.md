---
description: Composant Select - composants pour la saisie et validation de données utilisateur
triggers:
  - select
  - selection
  - core
  - aludateadapter
  - eludategranularity
  - lustringdateadapter
  - date
  - ludateselectinput
  - input
  - luinputdisplayer
  - form
  - field
  - control
  - validation
  - saisie
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Select

## Description

Le composant **Select** fait partie de la catégorie **Forms** du design system Lucca Front.

Composants pour la saisie et validation de données utilisateur.

**Story path:** `Documentation/Forms/Date/Select`
**Component:** `LuDateSelectInputComponent`


## Imports

```typescript
import { ALuDateAdapter, ELuDateGranularity, LuStringDateAdapter } from '@lucca-front/ng/core';
import { LuDateSelectInputComponent } from '@lucca-front/ng/date';
import { LuInputDisplayerDirective } from '@lucca-front/ng/input';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `selectedDate` | `text` | `-` | - |
| `table` | `any` | `-` | - |
| `secondSelectedDate` | `text` | `-` | - |
| `startOn` | `text` | `-` | - |
| `min` | `text` | `-` | - |
| `max` | `text` | `-` | - |
| `multiple` | `any` | `-` | - |

## Utilisation

### Quand utiliser Select

- Saisie de données
- Formulaires
- Configuration
- Filtres

### Quand ne pas utiliser

- Affichage de données en lecture seule
- Navigation

## Exemples

### Exemple basique

```html
<!-- Voir les stories pour des exemples détaillés -->
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.textfield` | Classe de base |
| `.textfield-input` | Classe de base |
| `.textfield-label` | Classe de base |

## Accessibilité

- Associer chaque champ à un label avec for/id
- Fournir des messages d'erreur explicites
- Supporter la navigation au clavier
- Indiquer les champs obligatoires

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
