# pr-Chip

## Quand utiliser ce composant
- Pour afficher des éléments dédiés dans une liste, comme des tags ou des catégories.
- Lorsque vous avez besoin d'un composant d'étiquette qui peut être supprimé ou non, selon le contexte d'utilisation.
- Lors de l'affichage de statuts ou de feedbacks visuels au sein d’interfaces utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-chip-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-chip-angular-basic--basic)

## Composant Figma
[pr-Chip Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=8730-71664) - Composant visuel avec différentes variantes de taille, palette de couleurs, états, et possibilité de suppression.

## Import

```typescript
import { ChipComponent } from '@lucca-front/ng/chip';
```

## Usage de base

```html
<lu-chip>Label</lu-chip>
```

## Directive / Composant : `lu-chip` ou `<lu-chip>`

Composant d'étiquette qui peut être utilisé pour représenter des éléments en tant que tags. Applicable sur les composants Angular.

### Valeurs

| Valeur       | Description                                       |
|--------------|---------------------------------------------------|
| `""` (vide)  | Variante par défaut.                              |
| `"S"`       | Taille petite.                                    |
| `"M"`       | Taille moyenne.                                   |
| `"product"`  | Applique la palette produit.                      |
| `"neutral"`  | Applique la palette neutre.                       |
| `"active"`   | État actif.                                      |
| `"disabled"`  | État désactivé.                                  |
| `"default"`  | État par défaut.                                  |
| `"hover"`    | État au survol.                                  |
| `"focus"`    | État de focus.                                   |
| `"warning"`   | Feedback avertissement.                          |
| `"critical"`  | Feedback critique.                               |
| `"none"`      | Pas de feedback.                                 |

```html
<lu-chip size="S" palette="product" state="active" feedback="warning" unkillable="true">Label</lu-chip>
```

## Inputs

### `unkillable`
Type: `boolean` — Default: `false`

Rend le chip non supprimable.

```html
<lu-chip [unkillable]="true">Label</lu-chip>
```

### `disabled`
Type: `boolean` — Default: `false`

Désactive le composant.

```html
<lu-chip [disabled]="true">Label</lu-chip>
```

### `product`
Type: `boolean` — Default: `false`

Applique la palette produit au composant.

```html
<lu-chip [product]="true">Label</lu-chip>
```

### `withEllipsis`
Type: `boolean` — Default: `false`

Ajoute une ellipse au texte et une tooltip lorsque le label est trop long.

```html
<lu-chip [withEllipsis]="true">Label avec un texte très long qui dépasse</lu-chip>
```

### `small`
Type: `boolean` — Default: `false`

Modifie la taille du composant.

```html
<lu-chip [small]="true">Label</lu-chip>
```

### `feedback`
Type: `'' | 'warning' | 'critical'` — Default: `''`

Donne une information sur l'état du composant.

```html
<lu-chip feedback="warning">Label d'avertissement</lu-chip>
```

## Patterns courants

### Exemple d'utilisation d'un chip avec plusieurs options
```html
<lu-chip unkillable="false" [disabled]="false" product="true" withEllipsis="false" small="true" feedback="critical">Label</lu-chip>
```

## Accessibilité
S'assurer que le chip est identifiable via un label accessible pour l'utilisateur. Ajouter un attribut `aria-label` si le texte n'est pas suffisamment descriptif.

## Guidelines Prisme
- Ne pas utiliser de styles qui dénaturent l'apparence du composant.
- Assurer une expérience utilisateur cohérente en respectant l'état et les retours visuels fournis par le chip.