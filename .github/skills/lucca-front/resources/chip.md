# pr-Chip

## Quand utiliser ce composant
- Pour afficher des étiquettes ou des badges avec des informations supplémentaires dans des listes ou tableaux.
- Lorsque vous souhaitez permettre aux utilisateurs de retirer dynamiquement des éléments d'une interface (avec l'option amovible).
- Pour représenter des éléments d'état avec différentes palettes de couleurs et de tailles pour une meilleure visibilité et hiérarchie visuelle.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-chip-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-chip-angular-basic--basic)

## Composant Figma
[pr-Chip sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=8730-71664) - Un élément visuel polyvalent, décliné en plusieurs tailles et palettes, permettant d'afficher des informations contextuelles. Variantes disponibles pour ajuster le style et le comportement.

## Import

```typescript
import { ChipComponent } from '@lucca-front/ng/chip';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-chip>Étiquette</lu-chip>
```

## Directive / Composant : `lu-chip` ou `button[luChip], a[luChip]`

Description courte du sélecteur. Applicable sur des éléments HTML comme `div`, `button` et `a`.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"removable"` | Permet de rendre l'élément amovible |

```html
<lu-chip removable>Étiquette amovible</lu-chip>
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'S'`

Définit la taille du chip.

```html
<lu-chip [size]="'M'">Étiquette Moyenne</lu-chip>
```

### `palette`
Type: `'Product' | 'Neutral'` — Default: `'Neutral'`

Choisit la palette de couleurs pour le chip.

```html
<lu-chip [palette]="'Product'">Étiquette Produit</lu-chip>
```

### `state`
Type: `'Active' | 'Disabled' | 'Default' | 'Hover' | 'Focus'` — Default: `'Default'`

Définit l'état du chip pour déterminer son style visuel.

```html
<lu-chip [state]="'Active'">Étiquette Active</lu-chip>
```

### `feedback`
Type: `'None' | 'Warning' | 'Critical'` — Default: `'None'`

Indique le type de feedback associé au chip.

```html
<lu-chip [feedback]="'Warning'">Étiquette Avertissement</lu-chip>
```

### `removable`
Type: `boolean` — Default: `false`

Indique si le chip peut être retiré.

```html
<lu-chip [removable]="true">Étiquette Amovible</lu-chip>
```

## Patterns courants

### Chip avec suppression
```html
<!-- Chip où l'utilisateur peut le retirer -->
<lu-chip size="M" removable>Étiquette Amovible</lu-chip>
```

## Accessibilité
Assurez-vous que les chips amovibles sont clairement étiquetés et que les utilisateurs peuvent comprendre comment interagir avec eux, y compris les raccourcis clavier pour les retirer.

## Guidelines Prisme
- Favoriser l'utilisation de la palette de couleurs neutres pour des éléments informatifs.
- Éviter les chips surchargés de texte, privilégier la clarté et la concision.