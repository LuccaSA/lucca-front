---
description: Composant Mobile push - composants pour communiquer des informations et états à l'utilisateur
triggers:
  - mobile-push
  - mobilepush
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

# Mobile push

## Description

Le composant **Mobile push** fait partie de la catégorie **Feedback** du design system Lucca Front.

Composants pour communiquer des informations et états à l'utilisateur.

**Story path:** `Documentation/Feedback/Mobile Push/Angular/Basic`
**Component:** `MobilePushComponent`


## Imports

```typescript
import { IconComponent } from '@lucca-front/ng/icon';
import { MobilePushComponent } from '@lucca-front/ng/mobile-push';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `alt` | `string` | `-` | Information conveyed by the screen reader |
| `size` | `'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'` | `-` | Which size should the icon be? XXS to XXL |
| `color` | `'primary' | 'secondary' | 'product' | 'error' |...` | `inherit` | Changes the color of the icon (inherit by default) |

## Utilisation

### Quand utiliser Mobile push

- Messages de succès/erreur
- Alertes importantes
- Informations contextuelles

### Quand ne pas utiliser

- Contenu principal
- Actions utilisateur

## Exemples

### Exemple basique

```html
<lu-mobile-push ...> Posez une absence depuis n’importe où avec l’application Lucca. </lu-mobile-push>
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.mobilePush-containerWrapper` | Classe de base |
| `.mobilePush` | Classe de base |
| `.mobilePush-icons` | Classe de base |
| `.mobilePush-icons-front` | Classe de base |
| `.lucca-icon` | Classe de base |
| `.mod-S` | Modificateur S |

## Accessibilité

- Utiliser aria-live pour les messages dynamiques
- Associer le rôle approprié (alert, status)
- Ne pas reposer uniquement sur la couleur

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
