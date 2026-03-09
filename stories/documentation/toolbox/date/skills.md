---
description: Composant Date - utilitaires et fonctions helpers
triggers:
  - date
  - button
  - callout
  - luhumanizedateformatter
  - luhumanizedatepipe
  - lurelativetime
  - lurelativetimeformatunit
  - utility
  - helper
  - tool
  - format
  - pipe
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Date

## Description

Le composant **Date** fait partie de la catégorie **Toolbox** du design system Lucca Front.

Utilitaires et fonctions helpers.

**Story path:** `Documentation/Toolbox/Dates/Humanize`
**Component:** `HumanizeStory`


## Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutComponent } from '@lucca-front/ng/callout';
import { LuHumanizeDateFormatter, LuHumanizeDatePipe, LuRelativeTime, LuRelativeTimeFormatUnit } from '@lucca-front/ng/date';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'M' | 'S' | 'XS'` | `-` | Change the size of the Button |
| `palette` | `Palette` | `none` | Applies a color palette to the Button |
| `state` | `'default' | 'loading' | 'error' | 'success'` | `default` | Modifies the state of the Button |

## Utilisation

### Quand utiliser Date

- Formatage de données
- Utilitaires réutilisables

### Quand ne pas utiliser

- Composants visuels

## Exemples

### Exemple basique

```html
<h1>Humanize</h1>
<h2>Langues</h2>
<p>Choisissez une langue</p>
<div class=
```


## Classes CSS

| Classe | Description |
|--------|-------------|

## Accessibilité

- S'assurer que les données formatées restent accessibles

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
