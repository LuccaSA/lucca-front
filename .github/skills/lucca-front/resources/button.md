# pr-ButtonGroup

## Quand utiliser ce composant
- Lorsque vous souhaitez grouper plusieurs boutons pour une action cohérente.
- Pour présenter des options alternatives que l'utilisateur peut choisir.
- Dans un contexte où l'espace est limité et où les boutons doivent être clairs et accessibles.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-actions-button-angular-ai--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-ai--basic)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-basic--basic)
- [Basic TEST](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-basic--basic-test)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-counter--basic)
- [Basic TEST](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-counter--basic-test)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-icon--basic)
- [Basic TEST](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-icon--basic-test)

## Composant Figma
[Consulter le design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=32845-165564) - Le pr-ButtonGroup dispose de plusieurs variantes : remplies et contourées, avec des palettes de couleurs variées (Product et Neutral), permettant des options flexibles pour les interfaces.

## Import

```typescript
import { ButtonGroupComponent } from '@lucca-front/ng/button';
// ou
import { ButtonGroupDirective } from '@lucca-front/ng/button';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-button-group>...</lu-button-group>
```

## Directive / Composant : `lu-button-group` ou `<lu-button-group>`

Sélecteur Angular utilisé pour regrouper des boutons. Applicable sur des éléments HTML comme `<div>` ou `<ng-container>`.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"outlined"` | Boutons avec contour |

```html
<lu-button-group variant="outlined">...</lu-button-group>
```

## Inputs

### `type`
Type: `'filled' | 'outlined'` — Default: `'filled'`

Détermine le style visuel des boutons à l'intérieur du groupe.

```html
<lu-button-group [type]="'outlined'">...</lu-button-group>
```

### `palette`
Type: `'product' | 'neutral'` — Default: `'product'`

Choisissez la palette de couleur parmi les options disponibles.

```html
<lu-button-group [palette]="'neutral'">...</lu-button-group>
```

### `number`
Type: `number` — Default: `2`

Indique le nombre de boutons à afficher dans le groupe.

```html
<lu-button-group [number]="4">...</lu-button-group>
```

## Patterns courants

### Groupement de boutons
```html
<!-- Regroupe plusieurs boutons d'action -->
<lu-button-group>
  <lu-button type="button">Action 1</lu-button>
  <lu-button type="button">Action 2</lu-button>
</lu-button-group>
```

## Accessibilité
Assurez-vous que chaque bouton dans le groupe a un label accessible pour les lecteurs d'écran.

## Guidelines Prisme
- Utiliser des noms de boutons clairs et descriptifs.
- Éviter de surcharger le groupe avec trop de boutons pour maintenir la lisibilité.
- Ne pas mélanger différents types ou palettes dans un même groupe.