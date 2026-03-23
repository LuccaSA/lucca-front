# pr-CalloutPopover

## Quand utiliser ce composant
- Lorsque vous souhaitez fournir des retours d'information contextuels à l'utilisateur dans une interface.
- Pour afficher des options d'action liées à un message d'information ou d'erreur dans une vue.
- Idéal pour des contextes où des éléments de feedback doivent être résumés et actionnables.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-feedback-callout-popover-angular--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-popover-angular--template)

## Composant Figma
[Vue du composant dans Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=14695-6658) - Composant avec diverses variantes en termes de taille, palette et état.

## Import

```typescript
import { CalloutPopoverComponent } from '@lucca-front/ng/callout';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-callout-popover [items]="3" [buttonLabel]="'Click me!'" [buttonAlt]="'Action dans le callout'"></lu-callout-popover>
```

## Directive / Composant : `luCalloutPopover` ou `<lu-callout-popover>`

Directive utilisée pour afficher un popover d'appel avec des options d'action. Applicable sur l'élément `<lu-callout-popover>`.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<lu-callout-popover [items]="3">...</lu-callout-popover>
```

## Inputs

### `items`
Type: `number` — Default: `1`

Nombre d'éléments présentés dans le callout.

```html
<lu-callout-popover [items]="3">...</lu-callout-popover>
```

### `buttonLabel`
Type: `string` — Default: `''`

Label du bouton d'action présent dans le callout.

```html
<lu-callout-popover [buttonLabel]="'Cliquez ici'">...</lu-callout-popover>
```

### `buttonAlt`
Type: `string` — Default: `''`

Information restituée par le bouton d'action.

```html
<lu-callout-popover [buttonAlt]="'Action disponible'">...</lu-callout-popover>
```

### `icon`
Type: `null | 'info' | 'success' | 'warning' | 'error' | 'help'` — Default: `null`

Ajoute une icône au callout.

```html
<lu-callout-popover [icon]="'info'">...</lu-callout-popover>
```

### `state`
Type: `null | 'success' | 'warning' | 'error'` — Default: `null`

État du callout, pour indiquer le type de message (succès, avertissement, erreur).

```html
<lu-callout-popover [state]="'error'">...</lu-callout-popover>
```

## Patterns courants

### Callout avec actions
```html
<!-- Exemple d'utilisation d'un callout avec des actions -->
<lu-callout-popover [items]="2" buttonLabel="Action" buttonAlt="Cliquez pour agir" state="warning">
	<ul lu-callout-feedback-list palette="neutral">
		<li lu-callout-feedback-item>
			<lu-feedback-item-description>Description du feedback</lu-feedback-item-description>
			<button lu-feedback-item-action luButton>Agir</button>
			<button lu-feedback-item-action luButton="outlined">Option</button>
		</li>
	</ul>
</lu-callout-popover>
```

## Accessibilité
Assurez-vous que le callout est accessible via le clavier et que les messages d'erreur/progressions sont suffisamment descriptifs et visibles.

## Guidelines Prisme
- Utiliser le composant de manière cohérente pour fournir du feedback.
- Ne pas surcharger l'utilisateur avec trop d'informations simultanément.
- Utiliser les palettes de couleurs de manière appropriée pour signifier les différents états.