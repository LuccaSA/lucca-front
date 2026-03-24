# Avatar

## Quand utiliser ce composant
1. Pour afficher l'avatar d'un utilisateur dans les profils, listes ou interfaces d'utilisateur.
2. Pour utiliser des avatars de remplacement (placeholders) lorsque l'image réelle de l'utilisateur n'est pas disponible.
3. Pour afficher des groupes d'avatars d'utilisateurs dans des interfaces collaboratives.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-users-avatar-angular-basic--docs)
- [Usage Basique](https://lucca-front.lucca.io/storybook/?path=/story/documentation-users-avatar-angular-basic--basic)
- [Groupe d'Utilisateurs](https://lucca-front.lucca.io/storybook/?path=/story/documentation-users-avatar-angular-group--basic)

## Composant Figma
[Visuel sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3426-28808) - Composant d'avatar illustrant différentes tailles (XS, S, M, L, XL, 2XL, 3XL) et identités d'utilisateurs.

## Import

```typescript
import { LuUserPictureComponent } from '@lucca-front/ng/avatar';
// ou
import { LuUserPopoverDirective } from '@lucca-front/ng/avatar';
```

## Usage de base

```html
<!-- Usage minimal d'un avatar -->
<lu-user-picture [identity]="'[FR] Archer Marie-Françoise'" size="L"></lu-user-picture>
```

## Directive / Composant : `lu-user-picture` ou `*[luUserPopover]`

Affiche l'image de l'utilisateur. Applicable sur les éléments de type image ou bloc pour les avatars.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut, affiche l'avatar sans popover. |

```html
<lu-user-picture [identity]="'[FR] Bart Maurice'" size="S"></lu-user-picture>
```

## Inputs

### `identity`
Type: `string` — Default: `''`

Identité de l'utilisateur à afficher dans l'avatar.

```html
<lu-user-picture [identity]="'[ES] Pérez Sofia'"></lu-user-picture>
```

### `size`
Type: `'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL'` — Default: `'M'`

Définit la taille de l'avatar à afficher.

```html
<lu-user-picture [identity]="'[UK] Berry Jessica'" size="XL"></lu-user-picture>
```

## Patterns courants

### Affichage d'un avatar avec popover
```html
<!-- Affiche l'avatar avec information au survol -->
<lu-user-picture [identity]="'[FR] Bragoulet Marie'" size="M" [luUserPopover]></lu-user-picture>
```

## Accessibilité
Assurez-vous que les avatars ont des attributs 'aria-label' appropriés pour décrire l'utilisateur, afin de faciliter l'accès pour les utilisateurs de lecteurs d'écran.

## Guidelines Prisme
- Utiliser des avatars de tailles appropriées selon le contexte (liste, carte, etc.).
- Ne pas surcharger l'interface avec trop d'avatars. 
- Privilégier l'utilisation de placeholders lorsque cela est pertinent.