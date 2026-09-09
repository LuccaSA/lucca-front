# highlight-text — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-texts-highlight-text-angular-basic--docs)

## Angular

### Text

```js
import { HighlightTextComponent } from '@lucca-front/ng/highlight-text';
```

```html
<h1>
	Lorem
	<lu-highlight-text>ipsum</lu-highlight-text>
	dolor
</h1>
```

## HTML/CSS

### Text sizes

```css
@forward '@lucca-front/scss/src/components/highlight-text';
```

```html
<div style="font: var(--pr-t-font-heading-1)">
	Lorem
	<strong class="highlightText">ipsum</strong>
	dolor
</div>
```

### Text

```css
@forward '@lucca-front/scss/src/components/highlight-text';
```

```html
<h1>
	Lorem
	<strong class="highlightText">ipsum</strong>
	dolor
</h1>
```
