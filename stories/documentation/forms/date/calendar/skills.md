---
description: Composant Calendar - composants pour la saisie et validation de données utilisateur
triggers:
  - calendar
  - calendrier
  - core
  - aludateadapter
  - lunativedateadapter
  - date
  - lucalendarinput
  - ludateadapterpipe
  - input
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

# Calendar

## Description

Le composant **Calendar** fait partie de la catégorie **Forms** du design system Lucca Front.

Composants pour la saisie et validation de données utilisateur.

**Story path:** `Documentation/Forms/Date/Calendar`
**Component:** `CalendarStory`


## Imports

```typescript
import { ALuDateAdapter, LuNativeDateAdapter } from '@lucca-front/ng/core';
import { LuCalendarInputComponent, LuDateAdapterPipe } from '@lucca-front/ng/date';
```


## Utilisation

### Quand utiliser Calendar

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
<lu-calendar [(ngModel)]=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.button` | Classe de base |
| `.mod-outlined` | Modificateur outlined |

## Accessibilité

- Associer chaque champ à un label avec for/id
- Fournir des messages d'erreur explicites
- Supporter la navigation au clavier
- Indiquer les champs obligatoires

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
