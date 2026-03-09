---
description: Composant Inline message - composants pour la saisie et validation de données utilisateur
triggers:
  - inline-message
  - inlinemessage
  - input
  - form
  - field
  - control
  - validation
  - saisie
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Inline message

## Description

Le composant **Inline message** fait partie de la catégorie **Forms** du design system Lucca Front.

Composants pour la saisie et validation de données utilisateur.

**Story path:** `Documentation/Forms/InlineMessage/Angular/Basic`
**Component:** `InlineMessageComponent`


## Imports

```typescript
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `state` | `InlineMessageState` | `-` | Inline message state |
| `size` | `'S' | 'M'` | `-` | Which size should the inline message be? Default, medium or small |

## Utilisation

### Quand utiliser Inline message

- Saisie de données
- Formulaires
- Configuration
- Filtres

### Quand ne pas utiliser

- Affichage de données en lecture seule
- Navigation

## Exemples

### Exemple basique

```html
<!-- Voir les stories pour des exemples détaillés -->
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.inlineMessage` | Classe de base |
| `.inlineMessage-content` | Classe de base |
| `.lucca-icon` | Classe de base |
| `.inlineMessage-statusIcon` | Classe de base |
| `.mod-S` | Modificateur S |
| `.is-success` | État success |
| `.is-warning` | État warning |
| `.is-error` | État error |

## Accessibilité

- Associer chaque champ à un label avec for/id
- Fournir des messages d'erreur explicites
- Supporter la navigation au clavier
- Indiquer les champs obligatoires

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
