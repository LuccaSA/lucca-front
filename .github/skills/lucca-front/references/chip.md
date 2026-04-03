# Chip

## Quand utiliser ce composant
- Pour afficher des éléments de données dans une interface utilisateur, tels que des tags ou des labels.
- Lorsqu'il est nécessaire d'offrir une option de suppression pour des éléments dynamiques.
- Pour indiquer des états contextuels ou de feedback (critique, warning, etc.) sur des données.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-chip-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-chip-angular-basic--basic)

## Composant Figma
[https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=8730-71664](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=8730-71664) — Le composant `pr-Chip` est représenté avec des variantes selon la taille, la palette, l'état, le feedback et la possibilité d'être amovible.

## Import

```typescript
import { ChipComponent } from '@lucca-front/ng/chip';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-chip>Texte du chip</lu-chip>
```

## Directive / Composant : `lu-chip` ou `button[luChip]`

Sélecteur pour le composant Chip, applicable sur les éléments `button` ou `a`.

### Valeurs (si directive avec valeurs)

| Valeur         | Description                     |
|----------------|---------------------------------|
| `""` (vide)    | Variante par défaut              |
| `"small"`      | Modifie la taille du composant   |
| `"product"`    | Applique la palette product      |
| `"withEllipsis"` | Ellipse le texte long avec tooltip |
| `disabled`     | Désactive le chip                |
| `unkillable`   | Rend le chip non supprimable     |
| `feedback`     | Indique l'état du chip (critique, warning, etc.) |

```html
<lu-chip [small]="true">Chip de petite taille</lu-chip>
```

## Inputs

### `unkillable`
Type: `boolean` — Default: `false`

Rend le chip non supprimable.

```html
<lu-chip [unkillable]="true">Chip non supprimable</lu-chip>
```

### `disabled`
Type: `boolean` — Default: `false`

Désactive le composant.

```html
<lu-chip [disabled]="true">Chip désactivé</lu-chip>
```

### `product`
Type: `boolean` — Default: `false`

Applique la palette product au composant.

```html
<lu-chip [product]="true">Chip produit</lu-chip>
```

### `withEllipsis`
Type: `boolean` — Default: `false`

Ajoute une ellipse au texte en cas de dépassement.

```html
<lu-chip [withEllipsis]="true">Texte très long pour un chip qui dépasse</lu-chip>
```

### `small`
Type: `boolean` — Default: `false`

Modifie la taille du composant.

```html
<lu-chip [small]="true">Chip de petite taille</lu-chip>
```

### `feedback`
Type: `'none' | 'warning' | 'critical'` — Default: `'none'`

Indique l'état du composant.

```html
<lu-chip [feedback]="'warning'">Chip avec feedback warning</lu-chip>
```

## Patterns courants

### Chip interactif
```html
<!-- Chip qui peut être supprimé -->
<lu-chip [removable]="true" (remove)="onRemove()">Chip amovible</lu-chip>
```

## Accessibilité
Assurez-vous que les chips interactifs possèdent des descriptifs clairs pour les lecteurs d'écran et que les actions de suppression sont confirmées par l'utilisateur.

## Guidelines Prisme
Inclure des chips dans les listes et tableaux pour une meilleure expérience utilisateur. Évitez l'utilisation excessive de couleurs rendant le composant difficile à lire.