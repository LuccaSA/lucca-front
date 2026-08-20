# listing — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-listings-listing-angular-basic--docs)

## Angular

Component selector : `lu-listing`

### Basic

```js
import { IconsList } from '@/stories/icons-list';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
```

```html
<lu-listing>
	<lu-listing-item>item</lu-listing-item>
	<lu-listing-item>item</lu-listing-item>
	<lu-listing-item>
		item
		<lu-listing>
			<lu-listing-item>item</lu-listing-item>
			<lu-listing-item>item</lu-listing-item>
			<lu-listing-item>item</lu-listing-item>
		</lu-listing>
	</lu-listing-item>
</lu-listing>
```

### Inline

```js
import { IconsList } from '@/stories/icons-list';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
```

```html
<lu-listing inline>
	<lu-listing-item>Lorem ipsum</lu-listing-item>
	<lu-listing-item>Lorem ipsum dolor sit amet</lu-listing-item>
	<lu-listing-item>Lorem ipsum dolor sit</lu-listing-item>
	<lu-listing-item>Lorem</lu-listing-item>
	<lu-listing-item>Lorem ipsum dolor</lu-listing-item>
	<lu-listing-item>Lorem ipsum dolor sit amet</lu-listing-item>
</lu-listing>
```

## HTML/CSS

### Basic

```css
@forward '@lucca-front/scss/src/components/listing';
```

```html
<ul class="listing">
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">
			item
			<ul class="listing">
				<li class="listing-item">
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<div class="listing-item-content">item</div>
				</li>
			</ul>
		</div>
	</li>
</ul>
```

### Checklist

```css
@forward '@lucca-front/scss/src/components/listing';
```

```html
<ul class="listing mod-checklist">
	<li class="listing-item">
		<span class="listing-item-icon lucca-icon" aria-hidden="true"></span>
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<span class="listing-item-icon lucca-icon" aria-hidden="true"></span>
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<span class="listing-item-icon lucca-icon" aria-hidden="true"></span>
		<div class="listing-item-content">
			item
			<ul class="listing mod-checklist palette-success">
				<li class="listing-item">
					<span class="listing-item-icon lucca-icon" aria-hidden="true"></span>
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<span class="listing-item-icon lucca-icon" aria-hidden="true"></span>
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<span class="listing-item-icon lucca-icon" aria-hidden="true"></span>
					<div class="listing-item-content">item</div>
				</li>
			</ul>
		</div>
	</li>
</ul>
```

### Divider

### Avec séparateur

```css
@forward '@lucca-front/scss/src/components/listing';
```

```html
<ul class="listing mod-inline mod-divider">
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
</ul>
```

### Icons

```css
@forward '@lucca-front/scss/src/components/listing';
```

```html
<ul class="listing mod-icons">
	<li class="listing-item">
		<span class="listing-item-icon lucca-icon icon-foodCroissant" aria-hidden="true"></span>
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<span class="listing-item-icon lucca-icon icon-foodBurger" aria-hidden="true"></span>
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<span class="listing-item-icon lucca-icon icon-foodCoffee" aria-hidden="true"></span>
		<div class="listing-item-content">
			item
			<ul
				class="listing palette-product mod-icons"
				style="--components-listing-item-icon-before-content: &quot;&quot;"
			>
				<li class="listing-item">
					<span class="listing-item-icon lucca-icon" aria-hidden="true"></span>
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<span class="listing-item-icon lucca-icon" aria-hidden="true"></span>
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<span class="listing-item-icon lucca-icon" aria-hidden="true"></span>
					<div class="listing-item-content">item</div>
				</li>
			</ul>
		</div>
	</li>
</ul>
```

### Inline

### Avec séparateur

```css
@forward '@lucca-front/scss/src/components/listing';
```

```html
<ul class="listing mod-inline">
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
</ul>
```

### Ordered

```css
@forward '@lucca-front/scss/src/components/listing';
```

```html
<ol class="listing">
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">
			item
			<ol class="listing">
				<li class="listing-item">
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<div class="listing-item-content">item</div>
				</li>
			</ol>
		</div>
	</li>
</ol>
```

### Reversed

```css
@forward '@lucca-front/scss/src/components/listing';
```

```html
<ol class="listing" reversed="reversed">
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">
			item
			<ol class="listing" reversed="reversed">
				<li class="listing-item">
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<div class="listing-item-content">item</div>
				</li>
			</ol>
		</div>
	</li>
</ol>
```

### Start

```css
@forward '@lucca-front/scss/src/components/listing';
```

```html
<ol class="listing" start="3">
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">item</div>
	</li>
	<li class="listing-item">
		<div class="listing-item-content">
			item
			<ol class="listing" start="3">
				<li class="listing-item">
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<div class="listing-item-content">item</div>
				</li>
				<li class="listing-item">
					<div class="listing-item-content">item</div>
				</li>
			</ol>
		</div>
	</li>
</ol>
```
