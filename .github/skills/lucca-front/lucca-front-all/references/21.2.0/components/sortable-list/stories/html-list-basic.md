# sortable-list — List basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/sortable-list';
@forward '@lucca-front/scss/src/components/clear';
```

```html
<ul class="sortableList">
	<li class="sortableList-item">
		<div class="sortableList-item-handler"></div>
		<div class="sortableList-item-content">
			<p class="sortableList-item-content-description">Label</p>
			<p class="sortableList-item-content-helper">Helper message</p>
		</div>
		<button class="clear sortableList-clear" type="button">
			<span aria-hidden="true" class="lucca-icon icon-signClose"></span>
			<span class="pr-u-mask">Delete</span>
		</button>
	</li>
	<li class="sortableList-item">
		<div class="sortableList-item-handler"></div>
		<div class="sortableList-item-content">
			<p class="sortableList-item-content-description">Label</p>
			<p class="sortableList-item-content-helper">Helper message</p>
		</div>
		<button class="clear sortableList-clear" type="button">
			<span aria-hidden="true" class="lucca-icon icon-signClose"></span>
			<span class="pr-u-mask">Delete</span>
		</button>
	</li>
	<li class="sortableList-item">
		<div class="sortableList-item-handler"></div>
		<div class="sortableList-item-content">
			<p class="sortableList-item-content-description">Label</p>
			<p class="sortableList-item-content-helper">Helper message</p>
		</div>
		<button class="clear sortableList-clear" type="button">
			<span aria-hidden="true" class="lucca-icon icon-signClose"></span>
			<span class="pr-u-mask">Delete</span>
		</button>
	</li>
</ul>
```
