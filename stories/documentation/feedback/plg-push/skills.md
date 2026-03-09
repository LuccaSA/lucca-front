---
description: Composant Plg push - composants pour communiquer des informations et états à l'utilisateur
triggers:
  - plg-push
  - plgpush
  - icon
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

# Plg push

## Description

Le composant **Plg push** fait partie de la catégorie **Feedback** du design system Lucca Front.

Composants pour communiquer des informations et états à l'utilisateur.

**Story path:** `Documentation/Feedback/PLG Push/Angular/Basic`
**Component:** `PLGPushComponent`


## Imports

```typescript
import { IconComponent } from '@lucca-front/ng/icon';
import { PLGPushComponent } from '@lucca-front/ng/plg-push';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `alt` | `string` | `-` | Information conveyed by the screen reader |
| `size` | `'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'` | `-` | Which size should the icon be? XXS to XXL |
| `color` | `'primary' | 'secondary' | 'product' | 'error' |...` | `inherit` | Changes the color of the icon (inherit by default) |

## Utilisation

### Quand utiliser Plg push

- Messages de succès/erreur
- Alertes importantes
- Informations contextuelles

### Quand ne pas utiliser

- Contenu principal
- Actions utilisateur

## Exemples

### Exemple basique

```html
<lu-plg-push ...${removed ?
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.link` | Classe de base |
| `.link-text` | Classe de base |
| `.link-icon` | Classe de base |
| `.plgPush` | Classe de base |
| `.plgPush-icons` | Classe de base |
| `.mod-icon` | Modificateur icon |
| `.mod-S` | Modificateur S |
| `.mod-onlyIcon` | Modificateur onlyIcon |
| `.mod-ghost` | Modificateur ghost |

## Accessibilité

- Utiliser aria-live pour les messages dynamiques
- Associer le rôle approprié (alert, status)
- Ne pas reposer uniquement sur la couleur

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
