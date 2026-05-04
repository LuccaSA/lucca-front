# CalloutDisclosure

## Quand utiliser ce composant
- Lorsque vous voulez afficher un message d'attention ou d'information de manière interactive.
- Pour grouper des éléments similaires avec des actions associées, comme des actions de retour ou des éléments feedback.
- Dans les situations où une interaction est requise de la part de l'utilisateur, par exemple lorsque des options doivent être présentées sous forme de liste dans une interface.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-feedback-callout-disclosure-angular--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-disclosure-angular--template)

## Composant Figma
[Visitez le composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=14686-65156) - Ce composant contient différentes variantes en termes de palette, taille et état.

## Import

```typescript
import { CalloutDisclosureComponent } from '@lucca-front/ng/callout';
```

## Usage de base

```html
<lu-callout-disclosure open="false" size="M" palette="neutral">
	<ul lu-callout-feedback-list palette="neutral">
		<li lu-callout-feedback-item>
			<lu-feedback-item-description>
				Feedback description.
			</lu-feedback-item-description>
			<button lu-feedback-item-action luButton="outlined" type="button">Click me !</button>
			<button lu-feedback-item-action luButton="ghost" type="button">Click me but inverted !</button>
		</li>
		<li lu-callout-feedback-item>
			<lu-feedback-item-description>
				Feedback description #2.
			</lu-feedback-item-description>
			<button lu-feedback-item-action luButton type="button">Click me !</button>
		</li>
	</ul>
</lu-callout-disclosure>
```

## Directive / Composant : `lu-callout-disclosure`

Composant principal pour afficher les messages d'appel à l'action. Applicable sur un élément HTML.

### Inputs

#### `icon`
Type: `string` — Default: `undefined`

Ajoute une icône au callout.

```html
<lu-callout-disclosure [icon]="'info'">...</lu-callout-disclosure>
```

#### `state`
Type: `'default' | 'hover' | 'focus'` — Default: `'default'`

État du callout.

```html
<lu-callout-disclosure [state]="'focus'">...</lu-callout-disclosure>
```

#### `size`
Type: `'S' | 'M'` — Default: `'M'`

Modifie la taille du callout.

```html
<lu-callout-disclosure [size]="'S'">...</lu-callout-disclosure>
```

#### `heading`
Type: `string` — Default: `undefined`

Titre du callout.

```html
<lu-callout-disclosure [heading]="'Important Information'">...</lu-callout-disclosure>
```

#### `palette`
Type: `'neutral' | 'success' | 'product' | 'critical' | 'warning'` — Default: `'neutral'`

Applique une palette de couleurs au callout.

```html
<lu-callout-disclosure [palette]="'success'">...</lu-callout-disclosure>
```

#### `open`
Type: `boolean` — Default: `false`

Place le callout dans son état déplié.

```html
<lu-callout-disclosure [open]="true">...</lu-callout-disclosure>
```

## Patterns courants

### Liste de feedbacks avec actions
```html
<lu-callout-disclosure [open]="false" size="M" palette="neutral">
	<ul lu-callout-feedback-list palette="neutral">
		<li lu-callout-feedback-item>
			<lu-feedback-item-description>
				Feedback description.
			</lu-feedback-item-description>
			<button lu-feedback-item-action luButton="outlined" type="button">Click me !</button>
		</li>
	</ul>
</lu-callout-disclosure>
```

## Accessibilité
Assurez-vous que les titres et descriptions soient clairs et pertinents. Utilisez les attributs `aria-` pour indiquer l'état et la pertinence des éléments dynamiques.

## Guidelines Prisme
- Utiliser le composant dans des situations où une rétroaction utilisateur est essentielle.
- Évitez d'utiliser trop de variantes simultanément qui pourraient rendre le callout confus visuellement.
- Garantir que le callout ne masquera pas les éléments importants de l'interface utilisateur.