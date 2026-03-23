# ResourceCardWrapper

## Quand utiliser ce composant
- Pour créer un conteneur de cartes de ressources qui peut être disposé de manière flexible.
- Lors de la création d'interfaces dynamiques où les cartes peuvent être réorganisées par l'utilisateur.
- Quand l'affichage de plusieurs cartes doit être organisé en grille ou en colonne.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-resource-card-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-resource-card-angular-basic--basic)
- [Drag and drop](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-resource-card-angular-drag-and-drop--basic)

## Composant Figma
[Visuel du composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=33040-2909). Variantes disponibles : Layout=Grid, Layout=Stacked.

## Import

```typescript
import { ResourceCardWrapperComponent } from '@lucca-front/ng/resource-card';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-resource-card-wrapper>...</lu-resource-card-wrapper>
```

## Directive / Composant : `luResourceCardWrapper` ou `<lu-resource-card-wrapper>`

Directive pour envelopper des cartes de ressources. Applicable sur les éléments de conteneur.

### Valeurs

| Valeur                | Description                  |
|-----------------------|------------------------------|
| `""` (vide)           | Variante par défaut          |
| `"grid"`              | Disposition en grille        |
| `"stacked"`           | Disposition empilée          |

```html
<lu-resource-card-wrapper layout="grid">...</lu-resource-card-wrapper>
```

## Inputs

### `wrapper`
Type: `boolean` — Default: `false`

Indique si le wrapper est actif.

```html
<lu-resource-card-wrapper [wrapper]="true">...</lu-resource-card-wrapper>
```

### `wrapperGrid`
Type: `boolean` — Default: `false`

Indique si le layout doit être en grille.

```html
<lu-resource-card-wrapper [wrapperGrid]="true">...</lu-resource-card-wrapper>
```

### `wrapperDraggable`
Type: `boolean` — Default: `false`

Indique si le wrapper permet le drag-and-drop.

```html
<lu-resource-card-wrapper [wrapperDraggable]="true">...</lu-resource-card-wrapper>
```

### `wrapperSize`
Type: `'S' | ''` — Default: `''`

Définit la taille des cartes contenues.

```html
<lu-resource-card-wrapper [wrapperSize]="'S'">...</lu-resource-card-wrapper>
```

## Patterns courants

### Utilisation de la carte avec drag-and-drop
```html
<!-- Exemple de carte avec fonctionnalité de drag-and-drop -->
<lu-resource-card-wrapper [wrapperDraggable]="true">...</lu-resource-card-wrapper>
```

## Accessibilité
Assurez-vous que les éléments pouvant être déplacés par glisser-déposer sont accessibles via le clavier et que des descriptions sont fournies pour les utilisateurs de lecteurs d'écran.

## Guidelines Prisme
- Veillez à utiliser des tailles et dispositions de carte conformes aux spécifications de design.
- Évitez les conflits de mise en page en testant différents contenus dans les cartes.