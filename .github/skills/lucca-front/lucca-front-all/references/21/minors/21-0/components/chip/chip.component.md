# chip — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-listings-chip-angular-basic--docs)

## Angular

### Basic

```js
import { ChipComponent } from '@lucca-front/ng/chip';
```

```html
<lu-chip>Label</lu-chip>
```

## HTML/CSS

### Ellipse

Il est nécessaire d'ajouter une balise `span` avec l'utilitaire `u-ellipsis` ainsi qu'une largeur autour du label afin d'obtenir une ellipse.

### Basic

```css
@forward '@lucca-front/scss/src/components/chip';
```

```html
<div class="chip">
	Label
	<button type="button" class="chip-kill">
		<span class="pr-u-mask">delete</span>
	</button>
</div>
```

### Disabled

```css
@forward '@lucca-front/scss/src/components/chip';
```

```html
<div class="chip is-disabled">
	Label
	<button type="button" class="chip-kill">
		<span class="pr-u-mask">delete</span>
	</button>
</div>
```

### Feedback

```css
@forward '@lucca-front/scss/src/components/chip';
```

```html
<div class="chip palette-warning">
	<span aria-hidden="true" class="chip-icon lucca-icon icon-signWarning"></span>
	John Doe
	<button type="button" class="chip-kill">
		<span class="pr-u-mask">delete</span>
	</button>
</div>
<div class="chip palette-critical">
	<span aria-hidden="true" class="chip-icon lucca-icon icon-signError"></span>
	John Doe
	<button type="button" class="chip-kill">
		<span class="pr-u-mask">delete</span>
	</button>
</div>
```

### Focusable

```css
@forward '@lucca-front/scss/src/components/chip';
```

```html
<button type="button" class="chip">Label</button>
```

### Palettes

```css
@forward '@lucca-front/scss/src/components/chip';
```

```html
<div class="chip palette-product">
	Label
	<button type="button" class="chip-kill">
		<span class="pr-u-mask">delete</span>
	</button>
</div>
```

### Small

```css
@forward '@lucca-front/scss/src/components/chip';
```

```html
<div class="chip mod-S">
	Label
	<button type="button" class="chip-kill">
		<span class="pr-u-mask">delete</span>
	</button>
</div>
```

### Unkillable

```css
@forward '@lucca-front/scss/src/components/chip';
```

```html
<div class="chip">Label</div>
```
