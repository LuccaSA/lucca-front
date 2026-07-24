# horizontalnavigation — Navigation tabs _(HTML/CSS)_

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
