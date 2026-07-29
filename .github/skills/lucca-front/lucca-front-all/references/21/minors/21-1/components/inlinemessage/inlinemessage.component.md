# inlinemessage — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-forms-inlinemessage-angular-basic--docs)

## Angular

Component selector : `lu-inline-message`

### Message basic

```js
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';
```

## HTML/CSS

### Message basic

```css
@forward '@lucca-front/scss/src/components/inline-message';
```

```html
<div class="inlineMessage">
	<p class="inlineMessage-content">Inline message</p>
</div>
```

### Message size

```css
@forward '@lucca-front/scss/src/components/inline-message';
```

```html
<div class="inlineMessage mod-S">
	<p class="inlineMessage-content">Inline message</p>
</div>
```

### Message states

```css
@forward '@lucca-front/scss/src/components/inline-message';
```

```html
<div class="inlineMessage is-success">
	<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
	<p class="inlineMessage-content">Inline message</p>
</div>
<div class="inlineMessage is-warning">
	<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
	<p class="inlineMessage-content">Inline message</p>
</div>
<div class="inlineMessage is-error">
	<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
	<p class="inlineMessage-content">Inline message</p>
</div>
```
