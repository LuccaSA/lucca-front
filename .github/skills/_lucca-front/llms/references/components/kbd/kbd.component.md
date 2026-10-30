# kbd — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-texts-kbd-angular-combination--docs)


## HTML/CSS

### Combination

```css
@forward '@lucca-front/scss/src/components/kbd';
```

```html
<kbd class="kbdWrapper">
	<kbd class="kbd">Ctrl</kbd>
	+
	<kbd class="kbd">S</kbd>
</kbd>
```

### Icon key

```css
@forward '@lucca-front/scss/src/components/kbd';
```

```html
<span class="kbdWrapper">
	<kbd class="kbd">
		<span aria-hidden="true" class="lucca-icon icon-arrowTop mod-XXS"></span>
		<span class="pr-u-mask">flèche haut</span>
	</kbd>
</span>
```

### Single key

```css
@forward '@lucca-front/scss/src/components/kbd';
```

```html
<span class="kbdWrapper"><kbd class="kbd">Échap</kbd></span>
```
