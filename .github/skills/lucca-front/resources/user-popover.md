# pr-UserPopover

## Quand utiliser ce composant
- Pour afficher les informations d'un collaborateur dans des listes ou tableaux.
- Lorsqu'une interaction rapide avec les détails d'un utilisateur est requise sans quitter la page actuelle.
- Pour rediriger les utilisateurs vers les fiches collaborateur ou les plannings de manière fluide.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-index-table-html-css-actions-user-popover--docs)

## Composant Figma
[Visuel pr-UserPopover sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=18202-1181) — Ce composant offre une présentation claire des informations utilisateur avec une option de redirection. Variante disponible : pr-UserPopover.

## Import

```typescript
import { UserPopoverComponent } from '@lucca-front/ng/popover';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-user-popover></lu-user-popover>
```

## Directive / Composant : `luUserPopover` ou `<lu-user-popover>`

Description courte du sélecteur. Applicable sur les éléments HTML où des informations utilisateur sont affichées.

## Inputs

### `userInfo`
Type: `User` — Default: `null`

Informations concernant l'utilisateur à afficher dans le popover.

```html
<lu-user-popover [userInfo]="user">...</lu-user-popover>
```

## Patterns courants

### Affichage d'un collaborateur
```html
<!-- Affichage des informations d'un collaborateur dans un tableau -->
<lu-user-popover [userInfo]="colleague">...</lu-user-popover>
```

## Accessibilité
Assurez-vous que le popover est accessible via le clavier et utilise des rôles ARIA appropriés pour indiquer son statut.

## Guidelines Prisme
- **Do** : Utiliser le composant pour offrir des informations rapides sans navigation.
- **Don't** : Éviter de surcharger le popover avec trop d'informations pour préserver la lisibilité.