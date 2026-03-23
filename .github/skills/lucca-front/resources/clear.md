# pr-Clear

## Quand utiliser ce composant
- Lorsque vous avez besoin d'un bouton clair pour réinitialiser un formulaire ou enlever des filtres.
- Pour améliorer l'accessibilité, en fournissant une alternative textuelle grâce à l'input `alt`.
- Lorsqu'il est nécessaire de rendre un bouton inactif dans certaines situations (utiliser `disabled`).

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-clear-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-clear-angular-basic--template)

## Composant Figma
[https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=5657-31695](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=5657-31695) 
Description visuelle : Le composant pr-Clear est un bouton avec plusieurs variantes de taille, palette et état (actif, désactivé, focus, etc.). Disponible en taille S et M, ainsi qu'en palettes de couleurs neutres et produits.

## Import

```typescript
import { ClearComponent } from '@lucca-front/ng/clear';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-clear>Clear</lu-clear>
```

## Directive / Composant : `luClear` ou `<lu-clear>`

Directive pour le composant de suppression, applicable aux éléments de type bouton.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"S"` | Variante taille petite |

```html
<lu-clear size="S">Clear</lu-clear>
```

## Inputs

### `size`
Type: `'' | 'S'` — Default: `''`

Modifie la taille du bouton.

```html
<lu-clear [size]="'S'">Clear</lu-clear>
```

### `palette`
Type: `'' | 'success' | 'warning' | 'error' | 'product' | 'brand' | 'neutral' | 'none' | 'primary' | 'grey'` — Default: `''`

Applique une palette de couleurs au bouton.

```html
<lu-clear [palette]="'product'">Clear</lu-clear>
```

### `inverted`
Type: `boolean` — Default: `false`

Modifie les couleurs du bouton pour un usage sur fond foncé.

```html
<lu-clear [inverted]="true">Clear</lu-clear>
```

### `disabled`
Type: `boolean` — Default: `false`

Désactive le bouton.

```html
<lu-clear [disabled]="true">Clear</lu-clear>
```

### `alt`
Type: `string` — Default: `''`

Information restituée par le lecteur d'écran.

```html
<lu-clear [alt]="'Clear button'">Clear</lu-clear>
```

### `hidden`
Type: `boolean` — Default: `false`

Masque le bouton.

```html
<lu-clear [hidden]="true">Clear</lu-clear>
```

## Patterns courants

### Bouton clair désactivé
```html
<lu-clear [disabled]="true">Clear</lu-clear>
```

## Accessibilité
Utiliser l'attribut `alt` pour fournir une description textuelle pour les lecteurs d'écran, garantissant que l'information soit accessible aux utilisateurs ayant des déficiences visuelles.

## Guidelines Prisme
- Respecter les tailles et les palettes de couleurs recommandées dans le Design System.
- Ne pas utiliser le composant dans des contextes où son effet d’annulation peut être déroutant pour l'utilisateur.
- Toujours fournir un texte alternatif clair pour maintenir l'accessibilité.