# User Tile (Composant `LuUserTileComponent` et directive `LuUserPopoverDirective`)

## Quand utiliser ce composant
- Afficher une fiche utilisateur contenant une photo, un nom et un rôle.
- Créer des listes ou vues agrégées d’utilisateurs dans une interface utilisateur.
- Offrir un aperçu des informations détaillées d’un utilisateur lorsque l’on survole ou clique sur une fiche.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-users-tile-angular-format--docs)
- [Format](https://lucca-front.lucca.io/storybook/?path=/story/documentation-users-tile-angular-format--format)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-users-tile-angular-basic--basic)

## Composant Figma
[User Tile sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=6053-35170)  
Une fiche visuelle représentant un utilisateur avec 4 variantes de tailles disponibles : XS, S, M et L.

## Import

```typescript
import { LuUserTileComponent, LuUserTileModule } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-user-tile [user]="bob"></lu-user-tile>
```

## Composants / Directives

### Composant : `<lu-user-tile>`
Ce composant est utilisé pour afficher une fiche utilisateur. Il peut être combiné avec la directive `luUserPopover` pour afficher un popover lors d’un clic ou d’un survol.

### Directive : `[luUserPopover]`
Cette directive permet d'attacher un popover à un élément HTML pour afficher des informations détaillées liées à un utilisateur au survol ou au clic.

```html
<button [luUserPopover]="bob" type="button" class="userPopover_trigger">
	<lu-user-tile [user]="bob"></lu-user-tile>
</button>
```

## Inputs

### `user`
Type: `any`  
Représente les données utilisateur à afficher. Généralement, un objet utilisateur contenant des informations telles que le nom, la photo et d'autres données pertinentes.

```html
<lu-user-tile [user]="bob"></lu-user-tile>
```

### `displayFormat` (optionnel)
Type: `'L' | 'FL' | 'LF'` — Default: `'L'`  
Définit le format d'affichage du nom de l'utilisateur :  
- `'L'` : Nom de famille uniquement  
- `'FL'` : Prénom + Nom de famille  
- `'LF'` : Nom de famille + Prénom

```html
<lu-user-tile [user]="bob" displayFormat="LF"></lu-user-tile>
```

### `role` (optionnel)
Type: `string`  
Le rôle de l'utilisateur à afficher dans la fiche (exemple : *Administrateur*).

```html
<lu-user-tile [user]="bob" role="Administrateur"></lu-user-tile>
```

### `size` (optionnel)
Type: `'XS' | 'S' | 'M' | 'L'` — Default: `'M'`  
Définit la taille de la fiche utilisateur. Les options sont :
- `'XS'` : Très petite
- `'S'` : Petite
- `'M'` : Moyenne
- `'L'` : Grande

```html
<lu-user-tile [user]="bob" size="L"></lu-user-tile>
```

## Patterns courants

### Combinaison avec un popover
Affiche un popover avec des informations détaillées lorsque l'utilisateur passe la souris sur une fiche utilisateur.

```html
<div class="pr-u-displayFlex pr-u-gap300">
	<button [luUserPopover]="bob" type="button" class="userPopover_trigger">
		<lu-user-tile [user]="bob" />
	</button>
</div>
```

### Affichage d’une fiche utilisateur avec rôle et format
Affiche la fiche avec un rôle spécifique et un format de nom *Nom Prénom*.

```html
<lu-user-tile [user]="bob" displayFormat="LF" role="Administrateur" />
```

### Modifier la taille de la fiche utilisateur
Affiche une fiche utilisateur en taille très petite.

```html
<lu-user-tile [user]="bob" size="XS" />
```

## Accessibilité
- Assurez-vous que les informations critiques telles que le nom complet ou le rôle soient également disponibles dans la structure HTML pour les lecteurs d’écran.
- Les boutons utilisant la directive `[luUserPopover]` doivent inclure l’attribut `aria-haspopup="dialog"` pour indiquer qu’un popover est disponible.

## Guidelines Prisme
[Consultez les guidelines Prisme pour User Tile](https://prisme.lucca.io/94310e217/v/latest/p/56d611)  
- Ne surchargez pas la fiche : limitez les informations affichées pour un maximum de lisibilité.  
- Veillez à ce que toutes les tailles et variantes soient cohérentes au sein d'une même interface pour éviter les ruptures de design.