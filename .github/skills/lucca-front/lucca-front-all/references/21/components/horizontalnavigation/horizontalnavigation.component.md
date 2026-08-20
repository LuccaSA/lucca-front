# horizontalnavigation — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-navigation-horizontalnavigation-angular--docs)

## Angular

Component selector : `lu-horizontal-navigation`

### Navigation basic

```js
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
```

```html
<lu-horizontal-navigation>
	<a
		*luHorizontalNavigationLink
		class="horizontalNavigation-list-item-action"
		routerLink="/"
		ariaCurrentWhenActive="page"
	>
		Page 1
	</a>
	<a *luHorizontalNavigationLink class="horizontalNavigation-list-item-action" href="#2" aria-current="page">Page 2</a>
	<a *luHorizontalNavigationLink class="horizontalNavigation-list-item-action is-disabled">Page 3</a>
</lu-horizontal-navigation>
```

### Navigation tabs

```js
import { HorizontalNavigationComponent, HorizontalNavigationTabComponent } from '@lucca-front/ng/horizontal-navigation';
```

```html
<lu-horizontal-navigation>
	<lu-horizontal-navigation-tab label="Tab 1">Content 1</lu-horizontal-navigation-tab>
	<lu-horizontal-navigation-tab label="Tab 2">Content 2</lu-horizontal-navigation-tab>
	<lu-horizontal-navigation-tab label="Tab 3">Content 3</lu-horizontal-navigation-tab>
	<lu-horizontal-navigation-tab label="Tab 4">Content 4</lu-horizontal-navigation-tab>
</lu-horizontal-navigation>
```

## HTML/CSS

Classe CSS : `.horizontalNavigation`

### Accessibilité

* L’attribut `aria-current="page"` permet d’indiquer la page courante à la fois sémantiquement et visuellement.
* Si vous devez ajouter un titre sémantique HTML à votre menu d’onglets, préférez d'ajouter ce titre directement dans la section de chaque panneau en utilisant la class `pr-u-mask`. Ne mélangez pas la navigation et la sémantique de titres.

Ma navigation :

Dans le composant :

### Navigation basic

```css
@forward '@lucca-front/scss/src/components/horizontal-navigation';
```

```html
<div class="horizontalNavigation">
	<ul class="horizontalNavigation-list">
		<li class="horizontalNavigation-list-item">
			<a href="#" class="horizontalNavigation-list-item-action" aria-current="page">Page 1</a>
		</li>
		<li class="horizontalNavigation-list-item">
			<a href="#" class="horizontalNavigation-list-item-action">Page 2</a>
		</li>
		<li class="horizontalNavigation-list-item">
			<a href="#" class="horizontalNavigation-list-item-action">Page 3</a>
		</li>
	</ul>
</div>
```

### Navigation container

Ce menu intègre un `container` pour s'aligner horizontalement au contenu de la page.

```css
@forward '@lucca-front/scss/src/components/horizontal-navigation';
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

### Navigation count

```css
@forward '@lucca-front/scss/src/components/horizontal-navigation';
@forward '@lucca-front/scss/src/components/numericBadge';
```

```html
<div class="horizontalNavigation">
	<ul class="horizontalNavigation-list">
		<li class="horizontalNavigation-list-item">
			<a href="#" class="horizontalNavigation-list-item-action" aria-current="page">
				Page
				<span class="numericBadge">9</span>
			</a>
		</li>
		<li class="horizontalNavigation-list-item">
			<a href="#" class="horizontalNavigation-list-item-action">
				Page
				<span class="numericBadge">9</span>
			</a>
		</li>
		<li class="horizontalNavigation-list-item">
			<a href="#" class="horizontalNavigation-list-item-action">
				Page
				<span class="numericBadge">9</span>
			</a>
		</li>
	</ul>
</div>
```

### Navigation scrollbox

```css
@forward '@lucca-front/scss/src/components/horizontal-navigation';
```

```html
<lu-scroll-box
	[attr.style]="'--components-scrollBox-gap: 0px; --components-scrollBox-paddingInline: 0px; --components-scrollBox-marginInline: calc(var(--pr-t-spacings-200) * -1)'"
>
	<div class="horizontalNavigation">
		<ul class="horizontalNavigation-list">
			<li class="horizontalNavigation-list-item">
				<a href="#" class="horizontalNavigation-list-item-action" aria-current="page">Page 1</a>
			</li>
			<li class="horizontalNavigation-list-item">
				<a href="#" class="horizontalNavigation-list-item-action">Page 2</a>
			</li>
			<li class="horizontalNavigation-list-item">
				<a href="#" class="horizontalNavigation-list-item-action">Page 3</a>
			</li>
			<li class="horizontalNavigation-list-item">
				<a href="#" class="horizontalNavigation-list-item-action">Page 4</a>
			</li>
			<li class="horizontalNavigation-list-item">
				<a href="#" class="horizontalNavigation-list-item-action">Page 5</a>
			</li>
			<li class="horizontalNavigation-list-item">
				<a href="#" class="horizontalNavigation-list-item-action">Page 6</a>
			</li>
		</ul>
	</div>
</lu-scroll-box>
```

### Navigation tabs

```css
@forward '@lucca-front/scss/src/components/horizontal-navigation';
```

```html
<div class="horizontalNavigation">
	<ul class="horizontalNavigation-list" role="tablist">
		<li class="horizontalNavigation-list-item" role="presentation">
			<button
				type="button"
				class="horizontalNavigation-list-item-action"
				role="tab"
				id="tab1"
				aria-controls="panel1"
				aria-selected="true"
			>
				Tab 1
			</button>
		</li>
		<li class="horizontalNavigation-list-item" role="presentation">
			<button
				type="button"
				class="horizontalNavigation-list-item-action"
				role="tab"
				id="tab2"
				aria-controls="panel2"
				tabindex="-1"
			>
				Tab 2
			</button>
		</li>
		<li class="horizontalNavigation-list-item" role="presentation">
			<button
				type="button"
				class="horizontalNavigation-list-item-action"
				role="tab"
				id="tab3"
				aria-controls="panel3"
				tabindex="-1"
			>
				Tab 3
			</button>
		</li>
	</ul>
</div>

<div id="panel1" aria-labelledby="tab1" role="tabpanel" tabindex="0" class="horizontalNavigation_panel is-active">
	<p>Content 1</p>
</div>

<div id="panel2" aria-labelledby="tab2" role="tabpanel" tabindex="0" class="horizontalNavigation_panel">
	<p>Content 2</p>
</div>

<div id="panel3" aria-labelledby="tab3" role="tabpanel" tabindex="0" class="horizontalNavigation_panel">
	<p>Content 3</p>
</div>
```
