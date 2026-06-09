# sortable-list — List _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/sortable-list';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/clear';
```

```html
<ul class="sortableList">
	<li class="sortableList-item">
		<span class="sortableList-item-handler button">
			<span class="lucca-icon icon-drag" aria-hidden="true"></span>
			<span class="pr-u-mask">Position 1. Utilisez les touches directionnelles pour réordonner</span>
		</span>
		<div class="sortableList-item-content">
			<p class="sortableList-item-content-description">Label</p>
			<p class="sortableList-item-content-helper">Helper message</p>
		</div>
		<button class="clear sortableList-clear" type="button">
			<span class="pr-u-mask">Delete</span>
		</button>
	</li>
	<li class="sortableList-item">
		<span class="sortableList-item-handler button">
			<span class="lucca-icon icon-drag" aria-hidden="true"></span>
			<span class="pr-u-mask">Position 1. Utilisez les touches directionnelles pour réordonner</span>
		</span>
		<div class="sortableList-item-content">
			<p class="sortableList-item-content-description">Label</p>
			<p class="sortableList-item-content-helper">Helper message</p>
		</div>
		<button class="clear sortableList-clear" type="button">
			<span class="pr-u-mask">Delete</span>
		</button>
	</li>
	<li class="sortableList-item">
		<span class="sortableList-item-handler button">
			<span class="lucca-icon icon-drag" aria-hidden="true"></span>
			<span class="pr-u-mask">Position 1. Utilisez les touches directionnelles pour réordonner</span>
		</span>
		<div class="sortableList-item-content">
			<p class="sortableList-item-content-description">Label</p>
			<p class="sortableList-item-content-helper">Helper message</p>
		</div>
		<button class="clear sortableList-clear" type="button">
			<span class="pr-u-mask">Delete</span>
		</button>
	</li>
</ul>
```
