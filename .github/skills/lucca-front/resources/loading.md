# pr-Loading

## Quand utiliser ce composant
- Lors de la soumission d'un formulaire pour indiquer à l'utilisateur que les données sont en cours de traitement.
- Pendant le chargement de données depuis une API pour informer l'utilisateur que l'application est en train de récupérer les informations.
- Dans les situations où des actions longues sont en cours pour améliorer l'expérience utilisateur en fournissant un feedback visuel.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-listbox-option-html-css-loading--docs)  
[Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-loaders-loading-angular-basic--basic)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=10583-34479)  
Le composant pr-Loading est une animation de chargement qui tourne pour signaler que quelque chose est en cours. Variantes disponibles : Palette=Product, Size=S, Palette=Product, Size=XS, Palette=Neutral, Size=M, Palette=Neutral, Size=XS, Palette=Product, Size=M, Palette=Neutral, Size=S.

## Import

```typescript
import { LoadingComponent } from '@lucca-front/ng/loading';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-loading></lu-loading>
```

## Directive / Composant : `lu-loading`

Composant indicatif de chargement. Applicable sur n'importe quel élément qui nécessite un indicateur visuel de traitement.

### Valeurs (si directive avec valeurs)

| Valeur         | Description                     |
|----------------|---------------------------------|
| `""` (vide)    | Variante par défaut             |
| `"outline"`    | Variante outline (non spécifiée)|
| `"solid"`      | Variante solide (non spécifiée) |

```html
<lu-loading></lu-loading>
```

## Inputs

### `palette`
Type: `'product' | 'neutral'` — Default: `'product'`

Détermine la palette de couleur à utiliser pour l'indicateur de chargement.

```html
<lu-loading [palette]="value"></lu-loading>
```

### `size`
Type: `'xs' | 's' | 'm'` — Default: `'m'`

Définit la taille de l'indicateur de chargement.

```html
<lu-loading [size]="value"></lu-loading>
```

## Patterns courants

### Chargement d'une soumission de formulaire
```html
<!-- Indicateur de chargement lors de la soumission -->
<lu-loading></lu-loading>
```

## Accessibilité
Assurez-vous que le composant de chargement n'est pas utilisé sur des éléments interactifs comme des boutons ou des liens pour ne pas interférer avec la navigation et l'interactivité de l'utilisateur.

## Guidelines Prisme
- Utilisez pr-Loading pour indiquer des processus longs ou des chargements.
- Ne pas combiner avec d'autres animations qui peuvent créer une confusion pour l'utilisateur.
- Assurez-vous que le composant est utilisé de manière cohérente à travers l'application.