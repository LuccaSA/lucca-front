# bubble-illustration — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-structure-bubble-illustration-angular-basic--docs)

## Angular

Component selector : `lu-bubble-illustration`

### Basic

```js
import { BubbleIllustrationComponent } from '@lucca-front/ng/bubble-illustration';
```

## HTML/CSS

### Basic

```css
@forward '@lucca-front/scss/src/components/bubble-illustration';
```

```html
<div
	class="bubbleIllustration"
	aria-hidden="true"
	[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/bubble-illustration/anniversary.svg' | luSafeExternalSvg"
></div>
```
