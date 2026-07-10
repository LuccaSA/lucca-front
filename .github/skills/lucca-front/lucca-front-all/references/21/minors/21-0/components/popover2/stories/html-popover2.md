# popover2 — Popover2 _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/popover2';
@forward '@lucca-front/scss/src/components/verticalNavigation';
```

```html
<div class="demo">
	<button luButton [luPopover2]="contentRef" luPopoverTrigger="click">Cliquez-moi !</button>
	<ng-template #contentRef>
		<div class="popover-contentOptional">
			<h3>Title</h3>
			<lu-divider />
			<lu-listing checklist palette="success">
				<lu-listing-item>item item item item item item item item item item item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
			</lu-listing>
		</div>
	</ng-template>
</div>
```

```html
examplePosition:
<pre>
	[
    new ConnectionPositionPair(&#123;originX: 'start', originY: 'bottom' &#125;, &#123; overlayX: 'start', overlayY: 'top' &#125;, -8, 0),
    new ConnectionPositionPair(
        &#123; originX: 'start', originY: 'top' &#125;,
				&#123;
            overlayX: 'start',
            overlayY: 'bottom',
        &#125;,
        -8,
        -32,
    ),
	]
	</pre
>

<a href="https://github.com/angular/components/blob/main/src/cdk/overlay/position/connected-position.ts#L28-L53">
	Angular CDK model for
	<code>ConnectedPosition</code>
</a>
<br />
<br />

<button luButton [luPopover2]="contentRef" [customPositions]="examplePosition" luPopoverTrigger="click">
	Cliquez-moi !
</button>
<ng-template #contentRef>
	<div class="popover-contentOptional">
		<div class="verticalNavigation mod-iconless">
			<ul class="verticalNavigation-list pr-u-listReset">
				<li class="verticalNavigation-list-item"><a href="#" class="verticalNavigation-list-item-link">Item A</a></li>
				<li class="verticalNavigation-list-item"><a href="#" class="verticalNavigation-list-item-link">Item B</a></li>
				<li class="verticalNavigation-list-item"><a href="#" class="verticalNavigation-list-item-link">Item C</a></li>
			</ul>
		</div>
	</div>
</ng-template>
```
