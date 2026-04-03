# Popover

## Quand utiliser ce composant
1. Afficher des informations détaillées sur un utilisateur lorsqu'on survole ou clique sur une zone spécifique.
2. Fournir des détails contextuels sur des éléments de l'interface sans perturber le flux utilisateur.
3. Afficher des options ou actions liées à un élément en minimisant l'occupation d'espace à l'écran.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-overlays-popover--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-users-popover-angular--basic)

## Composant Figma
[Voir sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=5742-31562)  
Les Popovers servent à afficher, par superposition, un contenu supplémentaire à partir d'une interaction avec un élément. Variante unique disponible.

## Import

```typescript
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```

## Usage de base

```html
<!-- Usage minimal -->
<div [luUserPopover]="user">Survolez-moi !</div>
```

## Directive : `[luUserPopover]`

La directive `luUserPopover` permet d'afficher un popover contenant des informations supplémentaires. Elle est typiquement utilisée sur des éléments HTML (ex. : `div`, `span`, etc.).

### Valeurs
`[luUserPopover]` accepte une instance de l'objet `ILuUser`, qui représente les informations de l'utilisateur à afficher dans le popover.

```typescript
interface ILuUser {
	id: number;
	name: string;
	email?: string;
	phoneNumber?: string;
	pictureUrl: string;
}
```

```html
<div [luUserPopover]="user">Détails utilisateur</div>
```

## Inputs

### `luUserPopover`
Type: `ILuUser`

Instance utilisateur pour laquelle afficher le popover.

```html
<div [luUserPopover]="user">Afficher les détails</div>
```

## Patterns courants

### Popover avec contenu utilisateur
```typescript
@Component({
	selector: 'app-root',
	template: `
		<div>
			<div [luUserPopover]="user">Survolez-moi pour voir les détails de l'utilisateur</div>
		</div>
	`,
})
export class AppComponent {
	user: ILuUser = {
		id: 1,
		name: 'Jean Dupont',
		email: 'jean.dupont@example.com',
		phoneNumber: '+33 1 23 45 67 89',
		pictureUrl: 'https://example.com/picture.jpg',
	};
}
```

## Accessibilité
- Utilisez des indicateurs visuels clairs pour signaler qu'un élément est interactif.
- Ajoutez des alternatives accessibles aux interactions par hover (ex. : déclenchement possible par focus ou clic).
- Assurez-vous que le contenu du popover est compréhensible, hiérarchisé et lisible.

## Guidelines Prisme
Voir les guidelines officielles sur les [Popovers dans Prisme](https://prisme.lucca.io/94310e217/v/latest/p/129fae).