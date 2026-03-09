---
description: Composant Callout disclosure - composants pour communiquer des informations et états à l'utilisateur
triggers:
  - callout-disclosure
  - calloutdisclosure
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

# Callout disclosure

## Description

Le composant **Callout disclosure** fait partie de la catégorie **Feedback** du design system Lucca Front.

Composants pour communiquer des informations et états à l'utilisateur.

**Story path:** `Documentation/Feedback/Callout Disclosure/Angular`
**Component:** `CalloutDisclosureComponent`


## Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutDisclosureComponent, CalloutFeedbackItemComponent, CalloutFeedbackItemDescriptionDirective, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'M' | 'S' | 'XS'` | `-` | Change the size of the Button |
| `palette` | `Palette` | `none` | Applies a color palette to the Button |
| `state` | `'default' | 'loading' | 'error' | 'success'` | `default` | Modifies the state of the Button |

## Utilisation

### Quand utiliser Callout disclosure

- Messages de succès/erreur
- Alertes importantes
- Informations contextuelles

### Quand ne pas utiliser

- Contenu principal
- Actions utilisateur

## Exemples

### Exemple basique

```html
<lu-callout-disclosure ......>
<ul lu-callout-feedback-list palette=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.calloutDisclosure` | Classe de base |
| `.calloutDisclosure-summary` | Classe de base |
| `.calloutDisclosure-summary-icon` | Classe de base |
| `.lucca-icon` | Classe de base |
| `.icon-signInfo` | Classe de base |
| `.mod-outlined` | Modificateur outlined |
| `.mod-ghost` | Modificateur ghost |
| `.mod-iconless` | Modificateur iconless |
| `.mod-S` | Modificateur S |
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
