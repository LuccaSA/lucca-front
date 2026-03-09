---
description: Composant Text flow - composants pour la typographie et le contenu textuel
triggers:
  - text-flow
  - textflow
  - text
  - typography
  - content
  - label
  - badge
  - tag
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Text flow

## Description

Le composant **Text flow** fait partie de la catégorie **Texts** du design system Lucca Front.

Composants pour la typographie et le contenu textuel.

**Story path:** `Documentation/Texts/Text flow/Angular/Basic`


## Imports

```typescript
import { TextFlowComponent } from '@lucca-front/ng/text-flow';
```


## Utilisation

### Quand utiliser Text flow

- Mise en forme de texte
- Labels
- Badges
- Tags

### Quand ne pas utiliser

- Actions interactives
- Formulaires

## Exemples

### Exemple basique

```html
<lu-text-flow>
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<p>Paragraph</p>
<p>Paragraph</p>
<h2>Heading 2</h2>
<p>Paragraph</p>
<ul>
<li>List item</li>
<li>List item</li>
<li>List item</li>
</ul>
<h3>Heading 3</h3>
<p>Paragraph</p>
<h4>Heading 4</h4>
<ol>
<li>List item</li>
<li>List item</li>
<li>List item</li>
</ol>
</lu-text-flow>
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.textFlow` | Classe de base |

## Accessibilité

- Utiliser une hiérarchie de titres logique
- Assurer un contraste de texte suffisant
- Éviter le texte dans les images

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
