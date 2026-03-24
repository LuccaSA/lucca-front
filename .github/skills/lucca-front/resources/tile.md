# pr-UserTile

## Quand utiliser ce composant
- Pour afficher des informations succinctes sur un utilisateur, comme son nom et sa photo.
- Idéal pour créer des listes d'utilisateurs dans des interfaces où l'espace est limité.
- Utile lorsque des interactions supplémentaires, comme un popover d'informations détaillées, sont nécessaires.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-users-tile-angular-format--docs)
- [Format](https://lucca-front.lucca.io/storybook/?path=/story/documentation-users-tile-angular-format--format)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-users-tile-angular-basic--basic)

## Composant Figma
[Accéder au design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=6053-35170) - Le composant pr-UserTile présente un design ergonomique adapté à différents contextes avec les variantes XS, S, M, et L.

## Import

```typescript
import { LuUserTileComponent } from '@lucca-front/ng/users';
import { LuUserPopoverDirective } from '@lucca-front/ng/users';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-user-tile></lu-user-tile>
```

## Directive / Composant : `lu-user-tile` ou `<lu-user-tile>`

Composant représentatif d'un utilisateur. Peut être utilisé pour afficher des informations sur un utilisateur.

### Valeurs (si directive avec valeurs)

- Aucune valeur spécifique à cette directive.

## Inputs

### `size`
Type: `'XS' | 'S' | 'M' | 'L'` — Default: `'M'`

Permet de définir la taille du composant utilisateur.

```html
<lu-user-tile [size]="'L'"></lu-user-tile>
```

## Patterns courants

### Affichage d'un utilisateur avec popover
```html
<lu-user-tile [luUserPopover]="userDetails"></lu-user-tile>
```

## Accessibilité
Assurez-vous que les informations affichées dans le composant sont accessibles via des technologies d'assistance. Utilisez des attributs ARIA descriptifs si nécessaire.

## Guidelines Prisme
- Ne pas surcharger le composant avec des informations superflues.
- Respecter l'harmonie visuelle selon les guidelines de Lucca pour assurer une cohérence avec le reste de l'interface.