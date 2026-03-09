---
description: Composant Numbers - utilitaires et fonctions helpers
triggers:
  - numbers
  - number
  - lunumberpipe
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

# Numbers

## Description

Le composant **Numbers** fait partie de la catégorie **Toolbox** du design system Lucca Front.

Utilitaires et fonctions helpers.

**Story path:** `Documentation/Toolbox/Numbers/Basic`
**Component:** `NumbersStory`


## Imports

```typescript
import { LuNumberPipe } from '@lucca-front/ng/number';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `value` | `number` | `Math.PI` | - |
| `precision` | `range` | `2` | - |

## Utilisation

### Quand utiliser Numbers

- Formatage de données
- Utilitaires réutilisables

### Quand ne pas utiliser

- Composants visuels

## Exemples

### Exemple basique

```html
<!-- Voir les stories pour des exemples détaillés -->
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.table` | Classe de base |
| `.table-head` | Classe de base |
| `.table-head-row` | Classe de base |
| `.table-head-row-cell` | Classe de base |
| `.table-body` | Classe de base |
| `.mod-alignRight` | Modificateur alignRight |

## Accessibilité

- S'assurer que les données formatées restent accessibles

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
