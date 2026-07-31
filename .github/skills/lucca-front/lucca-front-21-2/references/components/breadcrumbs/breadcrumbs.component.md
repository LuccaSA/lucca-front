# breadcrumbs — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-navigation-breadcrumbs-angular-basic--docs)

## Angular

Component selector : `lu-breadcrumbs`

### Basic

```js
import { BreadcrumbsComponent, BreadcrumbsLinkDirective } from '@lucca-front/ng/breadcrumbs';
```

```html
<lu-breadcrumbs>
	<a *luBreadcrumbsLink routerLink="/" ariaCurrentWhenActive="page">You</a>
	<a *luBreadcrumbsLink ariaCurrentWhenActive="page" href="#2">are</a>
	<a *luBreadcrumbsLink aria-current="page">here</a>
</lu-breadcrumbs>
```

## HTML/CSS

Classe CSS : `.breadcrumbs`

### Basic

```css
@forward '@lucca-front/scss/src/components/breadcrumbs';
```

```html
<nav class="breadcrumbs" aria-describedby="breadcrumbs-title">
	<p id="breadcrumbs-title" class="pr-u-mask">Breadcrumbs</p>
	<ol class="breadcrumbs-list">
		<li class="breadcrumbs-list-item"><a href="#" class="breadcrumbs-list-item-action">You</a></li>
		<li class="breadcrumbs-list-item"><a href="#" class="breadcrumbs-list-item-action">are</a></li>
		<li class="breadcrumbs-list-item"><span aria-current="page" class="breadcrumbs-list-item-action">here</span></li>
	</ol>
</nav>
```

### Compact

```css
@forward '@lucca-front/scss/src/components/breadcrumbs';
```

```html
<nav role="presentation" class="breadcrumbs mod-compact">
	<ol class="breadcrumbs-list">
		<li class="breadcrumbs-list-item"><a href="#" class="breadcrumbs-list-item-action">Previous page</a></li>
		<li class="breadcrumbs-list-item">
			<span aria-current="page" class="breadcrumbs-list-item-action">Current page</span>
		</li>
	</ol>
</nav>
```
