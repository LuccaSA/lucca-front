# Pr-Divider

## Quand utiliser ce composant
- Pour séparer visuellement des sections ou des éléments d'une interface.
- Lorsque des contenus nécessitent une distinction claire pour améliorer l'organisation visuelle.
- Pour créer des lignes de séparation dans des listes ou tableaux.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-listing-html-css-divider--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-divider-angular--basic)

## Composant Figma
[Composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3130-2035) - Ce composant dispose de trois variantes : Style Horizontal, Style Horizontal - Content, et Style Vertical.

## Import

```typescript
import { DividerComponent } from '@lucca-front/ng/divider';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-divider></lu-divider>
```

## Directive / Composant : `lu-divider`

Définit un séparateur visuel, applicable sur n'importe quel élément HTML.

### Inputs

### `separatorRole`
Type: `boolean` — Default: `false`

Permet de restituer Divider comme un séparateur natif (hr). Son éventuel contenu textuel ne sera alors plus restitué.

```html
<lu-divider [separatorRole]="true"></lu-divider>
```

## Patterns courants

### Séparation de sections
```html
<!-- Un Divider entre deux sections -->
<lu-divider></lu-divider>
```

## Accessibilité
Lorsque utilisé avec `separatorRole`, assurez-vous que le contenu textuel est adéquatement décrit pour maintenir la compréhension de l'interface.

## Guidelines Prisme
- Assurez-vous d'utiliser Divider pour une séparation claire entre différents contenus.
- Ne pas utiliser Divider pour des éléments qui ne nécessitent pas une distinction visuelle.