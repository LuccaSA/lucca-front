# fancybox — Box basic _(HTML/CSS)_

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
