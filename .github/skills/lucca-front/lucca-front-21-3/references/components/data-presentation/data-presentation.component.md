# data-presentation — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-forms-data-presentation-angular-basic--docs)

## Angular

Mots-clés : donnée, lecture seule, readonly

Component selector : `lu-data-presentation`

### Basic

```js
import { DataPresentationComponent } from '@lucca-front/ng/form-field';
```

```html
<lu-data-presentation label="Label">Value</lu-data-presentation>
```

## HTML/CSS

### Basic

```css
@forward '@lucca-front/scss/src/components/form-field';
@forward '@lucca-front/scss/src/components/presentation';
```

```html
<dl class="presentation">
	<dt class="presentation-term">Label</dt>
	<dd class="presentation-definition">Value</dd>
</dl>
```

### Size

```css
@forward '@lucca-front/scss/src/components/form-field';
@forward '@lucca-front/scss/src/components/presentation';
```

```html
<dl class="presentation mod-S">
	<dt class="presentation-term">Label</dt>
	<dd class="presentation-definition">Value</dd>
</dl>
```
