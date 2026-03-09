---
description: Composant Box - composants pour structurer la mise en page
triggers:
  - box
  - form-field
  - formfield
  - forms
  - radio
  - radiogroupinput
  - layout
  - container
  - structure
  - grid
  - card
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Box

## Description

Le composant **Box** fait partie de la catégorie **Structure** du design system Lucca Front.

Composants pour structurer la mise en page.

**Story path:** `Documentation/Structure/Box/Angular/Basic`


## Imports

```typescript
import { BoxComponent } from '@lucca-front/ng/box';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
```


## Utilisation

### Quand utiliser Box

- Organisation du contenu
- Mise en page
- Conteneurs

### Quand ne pas utiliser

- Composants interactifs

## Exemples

### Exemple basique

```html
<lu-form-field label=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.form-field` | Classe de base |
| `.formLabel` | Classe de base |
| `.checkboxField` | Classe de base |
| `.checkboxField-input` | Classe de base |
| `.checkboxField-icon` | Classe de base |
| `.mod-withArrow` | Modificateur withArrow |
| `.mod-inline` | Modificateur inline |
| `.mod-onlyIcon` | Modificateur onlyIcon |
| `.mod-ghost` | Modificateur ghost |
| `.mod-toggle` | Modificateur toggle |

## Accessibilité

- Utiliser des landmarks appropriés
- Maintenir un ordre de lecture logique
- Structurer le contenu de manière sémantique

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
