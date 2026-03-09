---
description: Composant Button - composants interactifs pour déclencher des actions utilisateur
triggers:
  - button
  - bouton
  - icon
  - numeric-badge
  - numericbadge
  - click
  - action
  - interactive
  - cta
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Button

## Description

Le composant **Button** fait partie de la catégorie **Actions** du design system Lucca Front.

Composants interactifs pour déclencher des actions utilisateur.

**Story path:** `Documentation/Actions/Button/Angular/AI`
**Component:** `ButtonComponent`


## Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'M' | 'S' | 'XS'` | `-` | Change the size of the Button |
| `palette` | `Palette` | `none` | Applies a color palette to the Button |
| `state` | `'default' | 'loading' | 'error' | 'success'` | `default` | Modifies the state of the Button |

## Utilisation

### Quand utiliser Button

- Actions utilisateur
- Déclenchement d'événements
- Soumission de formulaires

### Quand ne pas utiliser

- Navigation simple (utiliser Link)
- Affichage d'informations statiques

## Exemples

### Exemple basique

```html
<button aria-expanded=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.button` | Classe de base |
| `.numericBadge` | Classe de base |
| `.lucca-icon` | Classe de base |
| `.icon-arrowChevronBottom` | Classe de base |
| `.button-group` | Classe de base |
| `.mod-block` | Modificateur block |
| `.mod-disclosure` | Modificateur disclosure |
| `.mod-more` | Modificateur more |
| `.mod-outlined` | Modificateur outlined |
| `.mod-onlyIcon` | Modificateur onlyIcon |
| `.mod-ghost` | Modificateur ghost |
| `.mod-critical` | Modificateur critical |
| `.mod-S` | Modificateur S |
| `.mod-XS` | Modificateur XS |
| `.mod-AI` | Modificateur AI |
| `.is-loading` | État loading |
| `.is-success` | État success |
| `.is-error` | État error |
| `.palette-warning` | Palette warning |
| `.palette-mint` | Palette mint |
| `.palette-success` | Palette success |
| `.palette-error` | Palette error |

## Accessibilité

- Utiliser des éléments sémantiques appropriés (<button>, <a>)
- Fournir un texte alternatif pour les éléments visuels
- Assurer un contraste suffisant

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
