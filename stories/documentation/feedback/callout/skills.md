---
description: Composant Callout - composants pour communiquer des informations et états à l'utilisateur
triggers:
  - callout
  - button
  - calloutactions
  - calloutfeedbackitem
  - calloutfeedbacklist
  - icon
  - form-field
  - formfield
  - forms
  - textinput
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

# Callout

## Description

Le composant **Callout** fait partie de la catégorie **Feedback** du design system Lucca Front.

Composants pour communiquer des informations et états à l'utilisateur.

**Story path:** `Documentation/Feedback/Callout/Angular/AI`
**Component:** `CalloutComponent`


## Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutActionsComponent, CalloutComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
import { IconComponent } from '@lucca-front/ng/icon';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'M' | 'S' | 'XS'` | `-` | Change the size of the Button |
| `palette` | `Palette` | `none` | Applies a color palette to the Button |
| `state` | `'default' | 'loading' | 'error' | 'success'` | `default` | Modifies the state of the Button |

## Utilisation

### Quand utiliser Callout

- Messages de succès/erreur
- Alertes importantes
- Informations contextuelles

### Quand ne pas utiliser

- Contenu principal
- Actions utilisateur

## Exemples

### Exemple basique

```html
<lu-callout AI iconAlt=
```

### Autres exemples

```html
<lu-callout.........>
<p>Feedback description</p>... </lu-callout>
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.suggestion` | Classe de base |
| `.suggestion-form-field` | Classe de base |
| `.suggestion-callout` | Classe de base |
| `.suggestion-callout-text` | Classe de base |
| `.suggestion-callout-accept` | Classe de base |
| `.mod-outlined` | Modificateur outlined |
| `.mod-ghost` | Modificateur ghost |
| `.mod-inline` | Modificateur inline |
| `.mod-AI` | Modificateur AI |

## Accessibilité

- Utiliser aria-live pour les messages dynamiques
- Associer le rôle approprié (alert, status)
- Ne pas reposer uniquement sur la couleur

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
