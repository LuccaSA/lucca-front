# highlight-data — Code & Implementation

**Sommaire**

- Angular
  - Basic
- HTML/CSS
  - Action illustration
  - Action
  - Basic
  - Infos
  - Nested
  - No illustration
  - Bubble
  - Sizes
  - Themes


📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-structure-highlight-data-angular-basic--docs)

## Angular

### Basic

```js
import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { HIGHLIGHT_DATA_BUBBLE, HIGHLIGHT_DATA_ILLUSTRATION, HIGHLIGHT_DATA_PALETTE, HIGHLIGHT_DATA_SIZE, HIGHLIGHT_DATA_THEME, HighlightDataComponent } from '@lucca-front/ng/highlight-data';
import { LinkComponent } from '@lucca-front/ng/link';
```

```html
<lu-highlight-data heading="Title" value="Content" bubble="1" illustration="piggy-bank" />
```


## HTML/CSS

### Action illustration

```css
@forward '@lucca-front/scss/src/components/highlightData';
@forward '@lucca-front/scss/src/components/button';
```

```html
<div class="highlightData">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
		<dd class="highlightData-content-action"><button type="button" class="button mod-outlined">Action</button></dd>
	</dl>
	<div class="highlightData-illustrations">
		<div
			class="highlightData-illustrations-back"
			aria-hidden="true"
			[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/bubbles/1.svg' | luSafeExternalSvg"
		></div>
		<img
			alt=""
			class="highlightData-illustrations-front"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/polaroid-male.svg"
		/>
	</div>
</div>
```

### Action

```css
@forward '@lucca-front/scss/src/components/highlightData';
@forward '@lucca-front/scss/src/components/button';
```

```html
<div class="highlightData">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
		<dd class="highlightData-content-action"><button type="button" class="button mod-outlined">Action</button></dd>
	</dl>
</div>
```

### Basic

```css
@forward '@lucca-front/scss/src/components/highlightData';
```

```html
<div class="highlightData">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
	</dl>
	<div class="highlightData-illustrations">
		<div
			class="highlightData-illustrations-back"
			aria-hidden="true"
			[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/bubbles/1.svg' | luSafeExternalSvg"
		></div>
		<img
			alt=""
			class="highlightData-illustrations-front"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/piggy-bank.svg"
		/>
	</div>
</div>
```

### Infos

```css
@forward '@lucca-front/scss/src/components/highlightData';
```

```html
<div class="highlightData mod-valueFirst">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
	</dl>
	<div class="highlightData-illustrations">
		<div
			class="highlightData-illustrations-back"
			aria-hidden="true"
			[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/bubbles/1.svg' | luSafeExternalSvg"
		></div>
		<img
			alt=""
			class="highlightData-illustrations-front"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/piggy-bank.svg"
		/>
	</div>
</div>
```

### Nested

```css
@forward '@lucca-front/scss/src/components/highlightData';
```

```html
<div class="highlightData mod-nested">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
	</dl>
	<div class="highlightData-illustrations">
		<div
			class="highlightData-illustrations-back"
			aria-hidden="true"
			[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/bubbles/1.svg' | luSafeExternalSvg"
		></div>
		<img
			alt=""
			class="highlightData-illustrations-front"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/piggy-bank.svg"
		/>
	</div>
</div>
```

### No illustration

```css
@forward '@lucca-front/scss/src/components/highlightData';
```

```html
<div class="highlightData">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
	</dl>
</div>
```

### Bubble

```css
@forward '@lucca-front/scss/src/components/highlightData';
```

```html
<div class="highlightData">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
	</dl>
	<div class="highlightData-illustrations">
		<div
			class="highlightData-illustrations-back"
			aria-hidden="true"
			[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/bubbles/1.svg' | luSafeExternalSvg"
		></div>
	</div>
</div>
```

### Sizes

```css
@forward '@lucca-front/scss/src/components/highlightData';
```

```html
<div class="highlightData mod-S">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
	</dl>
	<div class="highlightData-illustrations">
		<div
			class="highlightData-illustrations-back"
			aria-hidden="true"
			[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/bubbles/1.svg' | luSafeExternalSvg"
		></div>
		<img
			alt=""
			class="highlightData-illustrations-front"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/piggy-bank.svg"
		/>
	</div>
</div>
<div class="highlightData mod-XS">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
	</dl>
	<div class="highlightData-illustrations">
		<div
			class="highlightData-illustrations-back"
			aria-hidden="true"
			[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/bubbles/1.svg' | luSafeExternalSvg"
		></div>
		<img
			alt=""
			class="highlightData-illustrations-front"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/piggy-bank.svg"
		/>
	</div>
</div>
```

### Themes

```css
@forward '@lucca-front/scss/src/components/highlightData';
```

```html
<div class="highlightData mod-light">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
	</dl>
	<div class="highlightData-illustrations">
		<div
			class="highlightData-illustrations-back"
			aria-hidden="true"
			[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/bubbles/1.svg' | luSafeExternalSvg"
		></div>
		<img
			alt=""
			class="highlightData-illustrations-front"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/piggy-bank.svg"
		/>
	</div>
</div>

<div class="highlightData mod-dark">
	<dl class="highlightData-content">
		<dt class="highlightData-content-title">Title</dt>
		<dd class="highlightData-content-value">Content</dd>
	</dl>
	<div class="highlightData-illustrations">
		<div
			class="highlightData-illustrations-back"
			aria-hidden="true"
			[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/bubbles/1.svg' | luSafeExternalSvg"
		></div>
		<img
			alt=""
			class="highlightData-illustrations-front"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/piggy-bank.svg"
		/>
	</div>
</div>
```
