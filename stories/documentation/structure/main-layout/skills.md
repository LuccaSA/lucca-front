---
description: Composant Main layout - composants pour structurer la mise en page
triggers:
  - main-layout
  - mainlayout
  - app-layout
  - applayout
  - container
  - mainlayoutblock
  - layout
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

# Main layout

## Description

Le composant **Main layout** fait partie de la catégorie **Structure** du design system Lucca Front.

Composants pour structurer la mise en page.

**Story path:** `Documentation/Structure/Main Layout/Angular/Basic`


## Imports

```typescript
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
import { ContainerComponent } from '@lucca-front/ng/container';
import { MainLayoutBlockComponent, MainLayoutComponent } from '@lucca-front/ng/main-layout';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `headerSticky` | `any` | `false` | - |

## Utilisation

### Quand utiliser Main layout

- Organisation du contenu
- Mise en page
- Conteneurs

### Quand ne pas utiliser

- Composants interactifs

## Exemples

### Exemple basique

```html
<lu-main-layout......>...... ... ... </lu-main-layout>
```

### Autres exemples

```html
<lu-app-layout>
<ng-container appLayoutBanner>banner</ng-container>
<ng-container appLayoutNavSide> navSide </ng-container>
<lu-main-layout......>...... ... ... </lu-main-layout>
</lu-app-layout>
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.fakeContent` | Classe de base |
| `.mainLayout-sidebar` | Classe de base |
| `.container` | Classe de base |
| `.mainLayout-content-inside-block` | Classe de base |
| `.mainLayout` | Classe de base |
| `.mod-overflow` | Modificateur overflow |

## Accessibilité

- Utiliser des landmarks appropriés
- Maintenir un ordre de lecture logique
- Structurer le contenu de manière sémantique

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
