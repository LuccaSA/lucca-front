# gauge — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-loaders-gauge-angular-basic--docs)

## Angular

Mots-clés : jauge, score

Component selector : `lu-gauge`

### Basic

```js
import { GaugeComponent } from '@lucca-front/ng/gauge';
```

```html
<lu-gauge size="40" value="33" />
```

## HTML/CSS

Classe CSS : `.gauge`

Pour un chargement de données, préférez l'utilisation de [progression](https://zeroheight.com/94310e217/p/916abd-progression).

### Circular

```css
@forward '@lucca-front/scss/src/components/gauge';
```

```html
<svg
	class="gauge"
	width="40"
	height="40"
	viewBox="0 0 40 40"
	[attr.style]="'--components-gauge-value: 33; --components-gauge-circleR: 16px'"
>
	<circle class="gauge-circleBackground" cx="20" cy="20" r="16"></circle>
	<circle class="gauge-circleBar" cx="20" cy="20" r="16"></circle>
</svg>
```

### Horizontal

```css
@forward '@lucca-front/scss/src/components/gauge';
```

```html
<div class="gauge" [attr.style]="'--components-gauge-value: 33%'"></div>
```
