# fancybox — Code & Implementation

**Sommaire**

- Angular
  - Box basic
  - Box deprecated
- HTML/CSS
  - Box basic
  - Box deprecated
  - Box only bubbles
  - Box size

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-structure-fancybox-angular-basic--docs)

## Angular

Component selector : `lu-fancy-box`

### Box basic

```js
import { FANCY_BOX_BACKGROUND_END_START, FANCY_BOX_BACKGROUND_START_END, FANCY_BOX_FOREGROUND_END_START, FANCY_BOX_FOREGROUND_START_END, FANCY_BOX_SIZE, FancyBoxComponent } from '@lucca-front/ng/fancy-box';
```

```html
<lu-fancy-box
	backgroundEndStart="plant"
	backgroundStartEnd="candies"
	foregroundStartEnd="pizza"
	foregroundEndStart="clips"
>
	Content
	<br />
	Content
	<br />
	Content
	<br />
	Content
	<br />
	Content
	<br />
	Content
</lu-fancy-box>
```

### Box deprecated

```js
import { FANCY_BOX_SIZE, FancyBoxComponent } from '@lucca-front/ng/fancy-box';
```

```html
<lu-fancy-box
	backgroundLeft="https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-left-plant.svg"
	backgroundRight="https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-right-candies.svg"
	foreground="https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/foreground-right-pizza.svg"
>
	Content
	<br />
	Content
	<br />
	Content
	<br />
	Content
	<br />
	Content
	<br />
	Content
</lu-fancy-box>
```

## HTML/CSS

Classe CSS : `.fancyBox`

### Box basic

```css
@forward '@lucca-front/scss/src/components/fancyBox';
```

```html
<div class="fancyBox">
	<div class="fancyBox-content">
		<div
			class="fancyBox-content-backgroundEndStart"
			[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-end-start-plant.svg' | luSafeExternalSvg"
		></div>
		<div
			class="fancyBox-content-backgroundStartEnd"
			[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-start-end-candies.svg' | luSafeExternalSvg"
		></div>
		<div
			class="fancyBox-content-foregroundStartEnd"
			[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/foreground-start-end-pizza.svg' | luSafeExternalSvg"
		></div>
		<div
			class="fancyBox-content-foregroundEndStart"
			[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/foreground-end-start-clips.svg' | luSafeExternalSvg"
		></div>
		Content
		<br />
		Content
		<br />
		Content
		<br />
		Content
		<br />
		Content
		<br />
		Content
	</div>
</div>
```

### Box deprecated

```css
@forward '@lucca-front/scss/src/components/fancyBox';
```

```html
<div
	class="fancyBox"
	[attr.style]="'
	--components-fancyBox-background-left: url(https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-left-plant.svg);
	--components-fancyBox-background-right: url(https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-right-candies.svg);
	--components-fancyBox-foreground: url(https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/foreground-right-pizza.svg);'"
>
	<div class="fancyBox-content">
		Content
		<br />
		Content
		<br />
		Content
		<br />
		Content
		<br />
		Content
		<br />
		Content
		<div class="fancyBox-content-foreground"></div>
	</div>
</div>
```

### Box only bubbles

```css
@forward '@lucca-front/scss/src/components/fancyBox';
```

```html
<div class="fancyBox">
	<div class="fancyBox-content">
		<div
			class="fancyBox-content-backgroundEndStart"
			[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-end-start-bubbles.svg' | luSafeExternalSvg"
		></div>
		<div
			class="fancyBox-content-backgroundStartEnd"
			[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-start-end-bubbles.svg' | luSafeExternalSvg"
		></div>
		Content
		<br />
		Content
		<br />
		Content
		<br />
		Content
		<br />
		Content
		<br />
		Content
	</div>
</div>
```

### Box size

```css
@forward '@lucca-front/scss/src/components/fancyBox';
```

```html
<div class="fancyBox mod-S">
	<div class="fancyBox-content">
		<div
			class="fancyBox-content-backgroundEndStart"
			[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-end-start-plant.svg' | luSafeExternalSvg"
		></div>
		<div
			class="fancyBox-content-backgroundStartEnd"
			[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-start-end-candies.svg' | luSafeExternalSvg"
		></div>
		<div
			class="fancyBox-content-foregroundStartEnd"
			[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/foreground-start-end-pizza.svg' | luSafeExternalSvg"
		></div>
		<div
			class="fancyBox-content-foregroundEndStart"
			[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/foreground-end-start-clips.svg' | luSafeExternalSvg"
		></div>
		Content
		<br />
		Content
		<br />
		Content
		<br />
		Content
		<br />
		Content
		<br />
		Content
	</div>
</div>
```
