# verticalnavigation — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-navigation-verticalnavigation-angular-disabled--docs)

## Angular

Component selector : `lu-vertical-navigation`

### Navigation disabled

```js
import { VerticalNavigationComponent, VerticalNavigationGroupComponent, VerticalNavigationItemComponent, VerticalNavigationLinkComponent } from '@lucca-front/ng/vertical-navigation';
```

```html
<lu-vertical-navigation heading="Section">
	<lu-vertical-navigation-item>
		<span luVerticalNavigationLink icon="heart" disabled>Item</span>
	</lu-vertical-navigation-item>
	<lu-vertical-navigation-group label="Group" icon="star">
		<lu-vertical-navigation-item>
			<span luVerticalNavigationLink icon="heart" disabled>Item</span>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			<span luVerticalNavigationLink icon="heart" disabled>Item</span>
		</lu-vertical-navigation-item>
	</lu-vertical-navigation-group>
	<lu-vertical-navigation-group label="Group" expanded="false" icon="heartFilled" disabled>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 4</a>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 5</a>
		</lu-vertical-navigation-item>
	</lu-vertical-navigation-group>
</lu-vertical-navigation>
```

### Navigation iconless

```js
import { VerticalNavigationComponent, VerticalNavigationGroupComponent, VerticalNavigationItemComponent, VerticalNavigationLinkComponent } from '@lucca-front/ng/vertical-navigation';
```

```html
<lu-vertical-navigation heading="Section">
	<lu-vertical-navigation-item>
		<a luVerticalNavigationLink href="#">Item 1</a>
	</lu-vertical-navigation-item>
	<lu-vertical-navigation-group label="Group">
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 2</a>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 3</a>
		</lu-vertical-navigation-item>
	</lu-vertical-navigation-group>
</lu-vertical-navigation>
```

### Navigation

```js
import { VerticalNavigationComponent, VerticalNavigationGroupComponent, VerticalNavigationItemComponent, VerticalNavigationLinkComponent } from '@lucca-front/ng/vertical-navigation';
```

```html
<lu-vertical-navigation heading="Section">
	<lu-vertical-navigation-group label="Group 1" icon="heart">
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 1</a>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#" aria-current="page">Item 2</a>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 3</a>
		</lu-vertical-navigation-item>
	</lu-vertical-navigation-group>
	<lu-vertical-navigation-item>
		<a luVerticalNavigationLink href="#" icon="heartFilled">Item 4</a>
	</lu-vertical-navigation-item>
</lu-vertical-navigation>
```

## HTML/CSS

Classe CSS : `.verticalNavigation`

### Navigation disabled

```css
@forward '@lucca-front/scss/src/components/vertical-navigation';
```

```html
<div class="verticalNavigation">
	<h3 class="verticalNavigation-sectionTitle">Section title</h3>
	<ul class="verticalNavigation-list">
		<li class="verticalNavigation-list-item">
			<button class="verticalNavigation-list-item-link" aria-expanded="false">
				<span aria-hidden="true" class="verticalNavigation-list-item-link-icon lucca-icon icon-heart"></span>
				Item
				<span
					aria-hidden="true"
					class="lucca-icon icon-arrowChevronBottom verticalNavigation-list-item-link-arrow"
				></span>
			</button>
			<ul class="verticalNavigation-list mod-child">
				<li class="verticalNavigation-list-item">
					<span class="verticalNavigation-list-item-link">Item</span>
				</li>
				<li class="verticalNavigation-list-item">
					<span class="verticalNavigation-list-item-link">Item</span>
				</li>
			</ul>
		</li>
		<li class="verticalNavigation-list-item">
			<button class="verticalNavigation-list-item-link" aria-expanded="true">
				<span aria-hidden="true" class="verticalNavigation-list-item-link-icon lucca-icon icon-heart"></span>
				Item
				<span
					aria-hidden="true"
					class="lucca-icon icon-arrowChevronBottom verticalNavigation-list-item-link-arrow"
				></span>
			</button>
			<ul class="verticalNavigation-list mod-child">
				<li class="verticalNavigation-list-item">
					<span class="verticalNavigation-list-item-link">Item</span>
				</li>
				<li class="verticalNavigation-list-item">
					<span class="verticalNavigation-list-item-link">Item</span>
				</li>
			</ul>
		</li>
	</ul>
</div>
```

### Navigation iconless

```css
@forward '@lucca-front/scss/src/components/vertical-navigation';
```

```html
<div class="verticalNavigation mod-iconless">
	<h3 class="verticalNavigation-sectionTitle">Section title</h3>
	<ul class="verticalNavigation-list">
		<li class="verticalNavigation-list-item">
			<button class="verticalNavigation-list-item-link" aria-expanded="false">
				Item
				<span
					aria-hidden="true"
					class="lucca-icon icon-arrowChevronBottom verticalNavigation-list-item-link-arrow"
				></span>
			</button>
			<ul class="verticalNavigation-list mod-child">
				<li class="verticalNavigation-list-item">
					<a href="#" class="verticalNavigation-list-item-link">Item</a>
				</li>
				<li class="verticalNavigation-list-item">
					<a href="#" class="verticalNavigation-list-item-link">Item</a>
				</li>
			</ul>
		</li>
		<li class="verticalNavigation-list-item">
			<button class="verticalNavigation-list-item-link" aria-expanded="true">
				Item
				<span
					aria-hidden="true"
					class="lucca-icon icon-arrowChevronBottom verticalNavigation-list-item-link-arrow"
				></span>
			</button>
			<ul class="verticalNavigation-list mod-child">
				<li class="verticalNavigation-list-item">
					<a href="#" class="verticalNavigation-list-item-link" aria-current="page">Item</a>
				</li>
				<li class="verticalNavigation-list-item">
					<a href="#" class="verticalNavigation-list-item-link">Item</a>
				</li>
			</ul>
		</li>
	</ul>
</div>
```

### Navigation

```css
@forward '@lucca-front/scss/src/components/vertical-navigation';
```

```html
<div class="verticalNavigation">
	<h3 class="verticalNavigation-sectionTitle">Section title</h3>
	<ul class="verticalNavigation-list">
		<li class="verticalNavigation-list-item">
			<button class="verticalNavigation-list-item-link" aria-expanded="false">
				<span aria-hidden="true" class="verticalNavigation-list-item-link-icon lucca-icon icon-heart"></span>
				Item
				<span
					aria-hidden="true"
					class="lucca-icon icon-arrowChevronBottom verticalNavigation-list-item-link-arrow"
				></span>
			</button>
			<ul class="verticalNavigation-list mod-child">
				<li class="verticalNavigation-list-item">
					<a href="#" class="verticalNavigation-list-item-link">Item</a>
				</li>
				<li class="verticalNavigation-list-item">
					<a href="#" class="verticalNavigation-list-item-link">Item</a>
				</li>
			</ul>
		</li>
		<li class="verticalNavigation-list-item">
			<button class="verticalNavigation-list-item-link" aria-expanded="true">
				<span aria-hidden="true" class="verticalNavigation-list-item-link-icon lucca-icon icon-heart"></span>
				Item
				<span
					aria-hidden="true"
					class="lucca-icon icon-arrowChevronBottom verticalNavigation-list-item-link-arrow"
				></span>
			</button>
			<ul class="verticalNavigation-list mod-child">
				<li class="verticalNavigation-list-item">
					<a href="#" class="verticalNavigation-list-item-link" aria-current="page">Item</a>
				</li>
				<li class="verticalNavigation-list-item">
					<a href="#" class="verticalNavigation-list-item-link">Item</a>
				</li>
			</ul>
		</li>
	</ul>
</div>
```
