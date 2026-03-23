# pr-UserTile

## Quand utiliser ce composant
- Pour afficher les informations d'un utilisateur de manière visuelle et compact, notamment dans les listes d'utilisateurs.
- Lorsqu'il est nécessaire d'afficher une image, le nom, et d'autres détails sur l'utilisateur dans un module.
- Dans des situations où l'interaction avec l'utilisateur est requise, comme des popovers pour des actions supplémentaires.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-users-tile-angular-format--docs)
- [Format](https://lucca-front.lucca.io/storybook/?path=/story/documentation-users-tile-angular-format--format)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-users-tile-angular-basic--basic)

## Composant Figma
[Composant pr-UserTile sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=6053-35170) — Ce composant présente les variantes disponibles en différentes tailles : XS, S, M, L.

## Import

```typescript
import { LuUserTileComponent } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-user-tile [user]="user">...</lu-user-tile>
```

## Directive / Composant : `luUserTile` ou `<lu-user-tile>`

Directive pour afficher un tile utilisateur. Applicable sur des éléments Angular pour intégrer des informations utilisateurs.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"XS"` | Taille extra petite |
| `"S"` | Taille petite |
| `"M"` | Taille moyenne |
| `"L"` | Taille grande |

```html
<lu-user-tile size="L" [user]="user">...</lu-user-tile>
```

## Inputs

### `user`
Type: `User` — Default: `undefined`

Objet représentant les informations de l'utilisateur à afficher.

```html
<lu-user-tile [user]="bob">...</lu-user-tile>
```

### `size`
Type: `'XS' | 'S' | 'M' | 'L'` — Default: `undefined`

Définit la taille du tile.

```html
<lu-user-tile [user]="bob" size="M">...</lu-user-tile>
```

## Patterns courants

### Affichage d'utilisateur
```html
<!-- Affichage basique d'un utilisateur avec popover -->
<button [luUserPopover]="bob" type="button" class="userPopover_trigger">
	<lu-user-tile [user]="bob" />
</button>
<lu-user-tile [user]="bob" displayFormat="LF" role="Administrateur" />
<lu-user-tile [user]="bob" size="L" />
```

## Accessibilité
Assurez-vous de fournir un rôle approprié et des attributs ARIA lorsque nécessaire pour améliorer l'accessibilité.

## Guidelines Prisme
Assurez-vous d'utiliser les styles et l'interface utilisateur définis dans le design system Prisme pour garantir l'homogénéité visuelle et fonctionnelle.