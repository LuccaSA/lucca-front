# Avatar Wrapper

## Quand utiliser ce composant
- Pour afficher un groupe d'avatars d'utilisateurs dans une interface.
- Lorsque vous souhaitez montrer les initiales des utilisateurs ou des images de profil.
- Pour intégrer facilement des popovers d'informations utilisateur à côté des avatars.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-users-avatar-angular-basic--docs)
- [Basic Story](https://lucca-front.lucca.io/storybook/?path=/story/documentation-users-avatar-angular-basic--basic)
- [Group Story](https://lucca-front.lucca.io/storybook/?path=/story/documentation-users-avatar-angular-group--basic)

## Composant Figma
[Design dans Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=21429-37117) - Composant représentant un wrapper d'avatars avec plusieurs tailles disponibles : XS, S, M, L.

## Import

```typescript
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```

## Usage de base

```html
<!-- Usage minimal -->
<ul class="avatarWrapper">
    <li class="avatarWrapper-item">
        <lu-user-picture [user]="user"></lu-user-picture>
    </li>
</ul>
```

## Directive / Composant : `lu-user-picture` ou `[luUserPopover]`

`lu-user-picture` est utilisé pour afficher l'image de l'utilisateur. `[luUserPopover]` est utilisé pour afficher un popover contenant des informations supplémentaires sur l'utilisateur lors du survol des avatars.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"XS"` | Taille extra petite |
| `"S"` | Taille petite |
| `"M"` | Taille moyenne |
| `"L"` | Taille grande |

```html
<lu-user-picture [sizes]="'S'" [user]="user"></lu-user-picture>
```

## Inputs

### `sizes`
Type: `'XS' | 'S' | 'M' | 'L'` — Default: `'M'`

Spécifie la taille de l'avatar à afficher.

```html
<lu-user-picture [sizes]="'L'" [user]="user"></lu-user-picture>
```

## Patterns courants

### Affichage de plusieurs utilisateurs
```html
<ul class="avatarWrapper" [class]="sizes()">
    <li class="avatarWrapper-item" translate="no">
        <lu-user-picture [user]="user1" aria-hidden="true"></lu-user-picture>
        <span class="pr-u-mask">{{ user1.firstName }} {{ user1.lastName }}</span>
    </li>
    <li class="avatarWrapper-item" translate="no">
        <lu-user-picture [user]="user2" aria-hidden="true"></lu-user-picture>
        <span class="pr-u-mask">{{ user2.firstName }} {{ user2.lastName }}</span>
    </li>
    <!-- Ajoutez d'autres utilisateurs ici -->
</ul>
```

## Accessibilité
Assurez-vous que chaque avatar a un attribut `aria-hidden="true"` pour ne pas être annoncé par les lecteurs d'écran si cela n'est pas nécessaire. Utilisez `<span class="pr-u-mask">` pour afficher le nom de l'utilisateur de manière descriptive.

## Guidelines Prisme
- Utilisez des tailles d'avatar appropriées pour différents cas d'utilisation.
- Évitez de surcharger l'interface avec trop d'avatars ; préférez utiliser un bouton pour montrer plus d'utilisateurs si nécessaire.
- Assurez-vous que les images des utilisateurs sont correctement accessibles et conformes aux normes d'accessibilité.