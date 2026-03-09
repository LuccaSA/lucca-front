---
description: Composant Callout popover - composants pour communiquer des informations et états à l'utilisateur
triggers:
  - callout-popover
  - calloutpopover
  - button
  - callout
  - calloutfeedbackitem
  - calloutfeedbackitemdescription
  - calloutfeedbacklist
  - notification
  - message
  - alert
  - status
  - feedback
  - info
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Callout popover

## Description

Le composant **Callout popover** fait partie de la catégorie **Feedback** du design system Lucca Front.

Composants pour communiquer des informations et états à l'utilisateur.

**Story path:** `Documentation/Feedback/Callout Popover/Angular`
**Component:** `CalloutPopoverComponent`


## Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutFeedbackItemComponent, CalloutFeedbackItemDescriptionDirective, CalloutFeedbackListComponent, CalloutPopoverComponent } from '@lucca-front/ng/callout';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'M' | 'S' | 'XS'` | `-` | Change the size of the Button |
| `palette` | `Palette` | `none` | Applies a color palette to the Button |
| `state` | `'default' | 'loading' | 'error' | 'success'` | `default` | Modifies the state of the Button |

## Utilisation

### Quand utiliser Callout popover

- Messages de succès/erreur
- Alertes importantes
- Informations contextuelles

### Quand ne pas utiliser

- Contenu principal
- Actions utilisateur

## Exemples

### Exemple basique

```html
<lu-callout-popover...>
<ul lu-callout-feedback-list palette=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.calloutPopover` | Classe de base |
| `.calloutPopover-icon` | Classe de base |
| `.lucca-icon` | Classe de base |
| `.icon-signInfo` | Classe de base |
| `.lu-popover-content` | Classe de base |
| `.mod-outlined` | Modificateur outlined |
| `.mod-ghost` | Modificateur ghost |
| `.mod-S` | Modificateur S |
| `.mod-XS` | Modificateur XS |
| `.palette-success` | Palette success |
| `.palette-warning` | Palette warning |
| `.palette-error` | Palette error |

## Accessibilité

- Utiliser aria-live pour les messages dynamiques
- Associer le rôle approprié (alert, status)
- Ne pas reposer uniquement sur la couleur

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
