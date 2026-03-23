# pr-Link

## Quand utiliser ce composant
- Pour créer des liens interactifs dans une interface utilisateur.
- Lors de la présentation d'actions cliquables qui nécessitent un retour visuel comme le changement d'état.
- Pour styliser des navigations internes et externes d'une manière cohérente avec le design system.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-actions-link-angular-test--docs)

## Composant Figma
[Visuel Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=33422-7619) — Composant pr-Link avec 40 variantes disponibles pour la taille, le soulignement, l'état et la palette.

## Import

```typescript
import { LinkComponent } from '@lucca-front/ng/actions';
// ou
import { LinkDirective } from '@lucca-front/ng/actions';
```

## Usage de base

```html
<!-- Usage minimal -->
<a luLink>Mon lien</a>
```

## Directive / Composant : `luLink` ou `<lu-link>`

Directive utilisée pour styliser les liens. Applicable sur les éléments `<a>` ou autres éléments HTML interactifs.

### Valeurs

| Valeur                                | Description                                   |
|---------------------------------------|-----------------------------------------------|
| `""` (vide)                           | Variante par défaut                          |
| `"size=M"`                            | Taille moyenne                                |
| `"size=S"`                            | Taille petite                                 |
| `"underline=True"`                    | Lien souligné                                 |
| `"underline=False"`                   | Lien non souligné                             |
| `"state=Focus"`                       | État lorsque le lien est focalisé            |
| `"state=Hover"`                       | État lorsque le lien est survolé             |
| `"state=Disabled"`                    | État désactivé                                |
| `"state=Default"`                     | État par défaut                               |
| `"state=Visited"`                     | État lorsque le lien a déjà été visité       |
| `"palette=Neutral"`                   | Palette neutre                                |
| `"palette=Product"`                   | Palette produit                               |

```html
<a luLink="size=M" luLink="underline=True" luLink="state=Hover" luLink="palette=Product">Lien interactif</a>
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Définit la taille du lien.

```html
<a luLink [size]="'S'">Lien petit</a>
```

### `underline`
Type: `boolean` — Default: `true`

Détermine si le lien doit être souligné.

```html
<a luLink [underline]="false">Lien sans soulignement</a>
```

### `state`
Type: `'Default' | 'Hover' | 'Focus' | 'Disabled' | 'Visited'` — Default: `'Default'`

Indique l'état visuel du lien.

```html
<a luLink [state]="'Hover'">Lien au survol</a>
```

### `palette`
Type: `'Neutral' | 'Product'` — Default: `'Neutral'`

Choisit la palette de couleurs à appliquer au lien.

```html
<a luLink [palette]="'Product'">Lien avec palette produit</a>
```

## Patterns courants

### Lien avec état et style
```html
<!-- Lien au survol avec taille grande et souligné -->
<a luLink size="M" underline="true" state="Hover">Lien stylisé</a>
```

## Accessibilité
Utiliser des éléments `<a>` pour les liens, s'assurer que le texte du lien est descriptif pour les utilisateurs de lecteurs d'écran. Fournir des couleurs de contraste suffisantes.

## Guidelines Prisme
Consulter les guidelines de style dans Zeroheight pour assurer la cohérence avec les autres composants du design system.