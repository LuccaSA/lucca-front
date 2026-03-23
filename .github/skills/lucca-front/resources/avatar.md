# pr-Avatar

## Quand utiliser ce composant
- Pour afficher une image de profil d'un utilisateur dans une application.
- Lorsqu'il est nécessaire d'afficher des initiales si l'image de l'utilisateur est manquante ou erronée.
- Pour former des groupes d'avatars pour représenter plusieurs utilisateurs dans une interface.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-users-avatar-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-users-avatar-angular-basic--basic)
- [Group](https://lucca-front.lucca.io/storybook/?path=/story/documentation-users-avatar-angular-group--basic)

## Composant Figma
[pr-Avatar sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3426-28808) - Variété d'écrans disponibles pour différents tailles et identités avec visualisation des avatars.

## Import

```typescript
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-user-picture [user]="someUser" sizes="L"></lu-user-picture>
```

## Directive / Composant : `luUserPicture` ou `<lu-user-picture>`

Affiche une image ou des initiales d'un utilisateur. Applicable n'importe où dans un document Angular.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Taille par défaut |
| `"XS"` | Taille extra petite |
| `"S"` | Taille petite |
| `"L"` | Taille grande |
| `"XL"` | Taille très grande |
| `"XXL"` | Taille extra grande |
| `"XXXL"` | Taille maxi |

```html
<lu-user-picture [user]="user" sizes="XL"></lu-user-picture>
```

## Inputs

### `user`
Type: `User` — Default: `null`

Représente les données de l'utilisateur à afficher.

```html
<lu-user-picture [user]="user"></lu-user-picture>
```

### `sizes`
Type: `'XS' | 'S' | '' | 'L' | 'XL' | 'XXL' | 'XXXL'` — Default: `''`

Définit la taille de l'avatar.

```html
<lu-user-picture [sizes]="'XL'" [user]="user"></lu-user-picture>
```

### `placeholder`
Type: `boolean` — Default: `false`

Indique si l'avatar doit afficher un espace réservé.

```html
<lu-user-picture [user]="user" [placeholder]="true"></lu-user-picture>
```

### `displayFormat`
Type: `LuDisplayInitials` — Default: `LuDisplayInitials.firstlast`

Détermine le format d'affichage des initiales lorsque l'image est manquante.

```html
<lu-user-picture [user]="user" [displayFormat]="LuDisplayInitials.firstlast"></lu-user-picture>
```

### `AI`
Type: `boolean` — Default: `false`

Indique si l'avatar devrait avoir un style supplémentaire pour des interactions AI.

```html
<lu-user-picture [user]="user" [AI]="true"></lu-user-picture>
```

## Patterns courants

### Avatars groupés
```html
<ul class="avatarWrapper">
	<li>
		<lu-user-picture [user]="user1"></lu-user-picture>
	</li>
	<li>
		<lu-user-picture [user]="user2"></lu-user-picture>
	</li>
	<li>
		<lu-user-picture [user]="user3"></lu-user-picture>
	</li>
</ul>
```

## Accessibilité
Assurez-vous de fournir des attributs ARIA pour les utilisateurs d'assistance et de décrire correctement chaque avatar à l'aide de l'attribut `aria-label` ou d'autres attributs pertinents.

## Guidelines Prisme
- Evitez des images trop lourdes pour garantir le temps de chargement.
- Ne pas afficher d'avatar sans un label descriptif alterné pour l'accessibilité.