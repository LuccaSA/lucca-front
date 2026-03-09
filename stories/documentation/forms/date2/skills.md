---
description: Composant Date2 - composants pour la saisie et validation de données utilisateur
triggers:
  - date2
  - calendar2
  - dateinput
  - calendarshortcut
  - daterange
  - daterangeinput
  - premadeshortcuts
  - calendarmode
  - form-field
  - formfield
  - icon
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

# Date2

## Description

Le composant **Date2** fait partie de la catégorie **Forms** du design system Lucca Front.

Composants pour la saisie et validation de données utilisateur.

**Story path:** `Documentation/Forms/Date2/Calendar`
**Component:** `DateRangeInputComponent`


## Imports

```typescript
import { Calendar2Component, DateInputComponent, CalendarShortcut, DateRange, DateRangeInputComponent, PremadeShortcuts, CalendarMode } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca-front/ng/icon';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `props` | `any` | `-` | - |

## Utilisation

### Quand utiliser Date2

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
<lu-calendar2 [hideToday]=
```

### Autres exemples

```html
<lu-form-field label=

<lu-calendar2 [hideWeekend]=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.calendar` | Classe de base |
| `.calendar-name` | Classe de base |
| `.calendar-name-button` | Classe de base |
| `.calendar-table` | Classe de base |
| `.calendar-table-head` | Classe de base |
| `.is-overflow` | État overflow |
| `.is-daysOff` | État daysOff |
| `.is-current` | État current |
| `.palette-watermelon` | Palette watermelon |

## Accessibilité

- Associer chaque champ à un label avec for/id
- Fournir des messages d'erreur explicites
- Supporter la navigation au clavier
- Indiquer les champs obligatoires

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
