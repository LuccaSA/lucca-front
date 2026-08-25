# container — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-navigation-horizontalnavigation-container--docs)

## Angular

### Basic

```js
import { ContainerComponent } from '@lucca-front/ng/container';
```

## HTML/CSS

### Container

```css
@forward '@lucca-front/scss/src/components/container';
@forward '@lucca-front/scss/src/components/horizontalNavigation';
```

```html
<div class="horizontalNavigation">
	<div class="horizontalNavigation-containerOptional">
		<ul class="horizontalNavigation-list">
			<li class="horizontalNavigation-list-item">
				<a href="#" class="horizontalNavigation-list-item-action" aria-current="page">Page 1</a>
			</li>
			<li class="horizontalNavigation-list-item">
				<a href="#" class="horizontalNavigation-list-item-action">Page 2</a>
			</li>
			<li class="horizontalNavigation-list-item">
				<a href="#" class="horizontalNavigation-list-item-action">Page 3</a>
			</li>
		</ul>
	</div>
</div>
```

### Basic

```css
@forward '@lucca-front/scss/src/components/container';
```

```html
<div class="container">Ce container est responsive et sert à placer le contenu de votre page.</div>
```
