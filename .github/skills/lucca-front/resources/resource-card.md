# ResourceCardWrapper

## Quand utiliser ce composant
- Pour afficher une liste de cartes de ressources dans une disposition en grille ou empilée.
- Lorsqu'il est nécessaire d'intégrer des actions sur chaque carte, comme des boutons ou des liens.
- Pour présenter des informations structurées et concises sur des objets, telles que des utilisateurs, des projets ou d'autres éléments significatifs.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-resource-card-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-resource-card-angular-basic--basic)
- [Drag and Drop](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-resource-card-angular-drag-and-drop--basic)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=33040-2909) - Ce composant représente une carte de ressource avec deux variantes de mise en page : Grille et Empilée.

## Import

```typescript
import { ResourceCardWrapperComponent } from '@lucca-front/ng/structure';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-resource-card-wrapper>
  <lu-resource-card>...</lu-resource-card>
</lu-resource-card-wrapper>
```

## Directive / Composant : `lu-resource-card-wrapper` ou `<lu-resource-card-wrapper>`

Composant principal pour encapsuler une ou plusieurs cartes de ressources. Applicable sur des éléments HTML comme `<div>`.

## Inputs

### `layout`
Type: `'grid' | 'stacked'` — Default: `'grid'`

Définit l'agencement des cartes de ressources, en grille ou empilé.

```html
<lu-resource-card-wrapper [layout]="layoutValue">...</lu-resource-card-wrapper>
```

## Patterns courants

### Affichage en grille
```html
<!-- Présente une collection de ressources en grille -->
<lu-resource-card-wrapper layout="grid">
  <lu-resource-card>...</lu-resource-card>
  <lu-resource-card>...</lu-resource-card>
</lu-resource-card-wrapper>
```

### Affichage empilé
```html
<!-- Présente une collection de ressources en disposition empilée -->
<lu-resource-card-wrapper layout="stacked">
  <lu-resource-card>...</lu-resource-card>
  <lu-resource-card>...</lu-resource-card>
</lu-resource-card-wrapper>
```

## Accessibilité
Assurez-vous que tous les liens et boutons inclus à l'intérieur des cartes sont accessibles via le clavier et ont des labels descriptifs.

## Guidelines Prisme
- Toujours fournir des directives claires pour l'utilisation des boutons et des liens dans les cartes.
- Évitez d'encombrer visuellement chaque carte avec trop d'informations.