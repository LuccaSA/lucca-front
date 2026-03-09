---
description: Composant Footer - composants pour structurer la mise en page
triggers:
  - footer
  - pied-de-page
  - button
  - layout
  - container
  - structure
  - grid
  - box
  - card
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Footer

## Description

Le composant **Footer** fait partie de la catégorie **Structure** du design system Lucca Front.

Composants pour structurer la mise en page.

**Story path:** `Documentation/Structure/Footer/Angular/Basic`


## Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { FooterComponent } from '@lucca-front/ng/footer';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'M' | 'S' | 'XS'` | `-` | Change the size of the Button |
| `palette` | `Palette` | `none` | Applies a color palette to the Button |
| `state` | `'default' | 'loading' | 'error' | 'success'` | `default` | Modifies the state of the Button |

## Utilisation

### Quand utiliser Footer

- Organisation du contenu
- Mise en page
- Conteneurs

### Quand ne pas utiliser

- Composants interactifs

## Exemples

### Exemple basique

```html
<lu-footer.........>
<ng-container footerContent> Content </ng-container>
<button type=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.footer-containerOptional` | Classe de base |
| `.footer-content` | Classe de base |
| `.footer-actions` | Classe de base |
| `.button` | Classe de base |
| `.mod-outlined` | Modificateur outlined |

## Accessibilité

- Utiliser des landmarks appropriés
- Maintenir un ordre de lecture logique
- Structurer le contenu de manière sémantique

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
