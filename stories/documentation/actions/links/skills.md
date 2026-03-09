---
description: Composant Links - composants interactifs pour déclencher des actions utilisateur
triggers:
  - links
  - link
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

# Links

## Description

Le composant **Links** fait partie de la catégorie **Actions** du design system Lucca Front.

Composants interactifs pour déclencher des actions utilisateur.

**Story path:** `Documentation/Actions/Link/Angular/TEST`
**Component:** `FirstPageComponent`


## Imports

```typescript
import { LinkComponent } from '@lucca-front/ng/link';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `routerLinkCommands` | `LuRouterLink['routerLink'] | null` | `null` | Target page address |

## Utilisation

### Quand utiliser Links

- Actions utilisateur
- Déclenchement d'événements
- Soumission de formulaires

### Quand ne pas utiliser

- Navigation simple (utiliser Link)
- Affichage d'informations statiques

## Exemples

### Exemple basique

```html
And this is the second page !
```

### Autres exemples

```html
Angular Navigation side: <a luLink=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.link` | Classe de base |
| `.lucca-icon` | Classe de base |
| `.icon-arrowExternal` | Classe de base |
| `.link-text` | Classe de base |
| `.link-icon` | Classe de base |
| `.mod-icon` | Modificateur icon |
| `.mod-decorationHover` | Modificateur decorationHover |
| `.is-disabled` | État disabled |

## Accessibilité

- Utiliser des éléments sémantiques appropriés (<button>, <a>)
- Fournir un texte alternatif pour les éléments visuels
- Assurer un contraste suffisant

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
