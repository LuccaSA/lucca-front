# bubble-illustration — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-bubble-illustration-angular-basic--docs)

## Angular

Component selector : `lu-bubble-illustration`

### Basic

```js
import { BUBBLE_ILLUSTRATION, BUBBLE_ILLUSTRATION_SIZE, BubbleIllustrationComponent } from '@lucca-front/ng/bubble-illustration';
import { DECORATIVE_PALETTE, PALETTE } from '@lucca/prisme/core';
```

```html
<lu-bubble-illustration illustration="anniversary" />
```

### List

```js
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BUBBLE_ILLUSTRATION, BubbleIllustrationComponent } from '@lucca-front/ng/bubble-illustration';
```

```html
<div class="demo-list">
	@for (illustration of illustrations; track illustration) {
		<div class="demo-list-item">
			<lu-bubble-illustration [illustration]="illustration" />
			<code class="code">{{ illustration }}</code>
		</div>
	}
</div>
```

## HTML/CSS

Classe CSS : `.bubbleIllustration`

### Basic

```css
@forward '@lucca-front/scss/src/components/bubbleIllustration';
```

```html
<span
	class="bubbleIllustration"
	aria-hidden="true"
	[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/bubble-illustration/anniversary.svg' | luSafeExternalSvg"
></span>
```
