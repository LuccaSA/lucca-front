# fancybox — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-structure-fancybox-angular-basic--docs)

## Angular

Component selector : `lu-fancy-box`

### Box basic

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
</lu-fancy-box>
```

## HTML/CSS

Classe CSS : `.fancyBox`

### Box basic

```css
@forward '@lucca-front/scss/src/components/fancy-box';
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
		Fancy box content
		<div class="fancyBox-content-foreground"></div>
	</div>
</div>
```
