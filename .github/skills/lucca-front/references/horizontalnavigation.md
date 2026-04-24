# HorizontalNavigation

## Quand utiliser ce composant
- Pour créer des barres de navigation horizontales dans des applications Angular.
- Lorsque vous avez besoin d'une navigation accessible avec des liens actionnables.
- Idéal pour les systèmes de navigation à plusieurs niveaux où l'utilisateur doit sélectionner une page.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-navigation-horizontalnavigation-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-horizontalnavigation-angular--basic)

## Composant Figma
[Composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3104-410) - Illustration du composant HorizontalNavigation avec les variantes disponibles : Size=M, Size=S.

## Import

```typescript
import { HorizontalNavigationComponent } from '@lucca-front/ng/horizontal-navigation';
import { HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-horizontal-navigation>
    <a *luHorizontalNavigationLink routerLink="/" ariaCurrentWhenActive="page">Page 1</a>
    <a *luHorizontalNavigationLink href="#2" aria-current="page">Page 2</a>
    <a *luHorizontalNavigationLink class="is-disabled">Page 3</a>
</lu-horizontal-navigation>
```

## Directive / Composant : `lu-horizontal-navigation` ou `[luHorizontalNavigationLink]`

Le sélecteur pour le composant HorizontalNavigation. Applicable sur les éléments de navigation comme `a` pour les liens.

### Valeurs

| Valeur                  | Description                           |
|-------------------------|---------------------------------------|
| `""` (vide)             | Variante par défaut                   |
| `"size=M"`             | Variante de taille moyenne            |
| `"size=S"`             | Variante de taille petite             |

```html
<lu-horizontal-navigation size="size=M">
    <a *luHorizontalNavigationLink routerLink="/" ariaCurrentWhenActive="page">Page 1</a>
</lu-horizontal-navigation>
```

## Inputs

### `size`
Type: `'size=M' | 'size=S'` — Default: `'size=M'`

Modifie la taille du composant.

```html
<lu-horizontal-navigation [size]="'size=S'">...</lu-horizontal-navigation>
```

### `noBorder`
Type: `boolean` — Default: `false`

Retire la bordure sous le composant.

```html
<lu-horizontal-navigation [noBorder]="true">...</lu-horizontal-navigation>
```

### `container`
Type: `boolean` — Default: `false`

Applique un container autour des liens pour aligner le composant avec le contenu de la page.

```html
<lu-horizontal-navigation [container]="true">...</lu-horizontal-navigation>
```

### `numericBadge`
Type: `boolean` — Default: `false`

Présente un exemple avec Numeric Badge.

```html
<lu-horizontal-navigation [numericBadge]="true">...</lu-horizontal-navigation>
```

## Patterns courants

### Navigation simple
```html
<lu-horizontal-navigation>
    <a *luHorizontalNavigationLink routerLink="/" ariaCurrentWhenActive="page">Accueil</a>
    <a *luHorizontalNavigationLink routerLink="/services">Services</a>
    <a *luHorizontalNavigationLink class="is-disabled">Contact</a>
</lu-horizontal-navigation>
```

## Accessibilité
Utilisez `aria-current` pour indiquer la page active. Assurez-vous que tous les liens sont accessibles par le clavier.

## Guidelines Prisme
- Favorisez l'utilisation de tailles adaptées en fonction du contexte d'utilisation.
- Évitez de rendre des liens désactivés pour la navigation ; utilisez `class="is-disabled"` pour les indiquer plutôt que d'utiliser des liens inopérables.