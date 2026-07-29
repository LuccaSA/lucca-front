# breadcrumbs — Basic _(HTML/CSS)_

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
