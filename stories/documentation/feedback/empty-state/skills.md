---
description: Composant Empty state - composants pour communiquer des informations et états à l'utilisateur
triggers:
  - empty-state
  - emptystate
  - button
  - emptystatepage
  - emptystatesection
  - safe-content
  - lusafeexternalsvgpipe
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

# Empty state

## Description

Le composant **Empty state** fait partie de la catégorie **Feedback** du design system Lucca Front.

Composants pour communiquer des informations et états à l'utilisateur.

**Story path:** `Documentation/Feedback/Empty State/Angular/Page`
**Component:** `EmptyStatePageComponent`


## Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStatePageComponent, EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'M' | 'S' | 'XS'` | `-` | Change the size of the Button |
| `palette` | `Palette` | `none` | Applies a color palette to the Button |
| `state` | `'default' | 'loading' | 'error' | 'success'` | `default` | Modifies the state of the Button |

## Utilisation

### Quand utiliser Empty state

- Messages de succès/erreur
- Alertes importantes
- Informations contextuelles

### Quand ne pas utiliser

- Contenu principal
- Actions utilisateur

## Exemples

### Exemple basique

```html
<lu-empty-state-page heading=
```

### Autres exemples

```html
<lu-empty-state-section illustration=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.emptyState` | Classe de base |
| `.emptyState-container` | Classe de base |
| `.emptyState-content` | Classe de base |
| `.emptyState-content-icon` | Classe de base |
| `.emptyState-content-text` | Classe de base |
| `.mod-page` | Modificateur page |
| `.mod-outlined` | Modificateur outlined |
| `.mod-center` | Modificateur center |
| `.mod-action` | Modificateur action |
| `.mod-L` | Modificateur L |
| `.palette-success` | Palette success |

## Accessibilité

- Utiliser aria-live pour les messages dynamiques
- Associer le rôle approprié (alert, status)
- Ne pas reposer uniquement sur la couleur

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
