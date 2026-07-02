# impersonation — Basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/impersonation';
@forward '@lucca-front/scss/src/components/avatar';
@forward '@lucca-front/scss/src/components/clear';
```

```html
<div class="impersonation">
	<button type="button" class="impersonation-trigger" aria-expanded="false" aria-controls="popover-content-0">
		<span class="pr-u-mask">Switch profile:</span>
		<div class="avatar mod-softRounded mod-S">
			<div class="avatar-picture" style="background-color: rgb(92, 214, 200)">
				<span translate="no" class="avatar-picture-initials">DP</span>
			</div>
		</div>
		Durand Pierre
		<span class="pr-u-mask">– Page content updates as soon as this filter is changed</span>
		<span class="impersonation-trigger-icon">
			<span aria-hidden="true" class="lucca-icon icon-chevronBottom"></span>
		</span>
	</button>
	<button class="clear impersonation-clear">
		<span class="pr-u-mask">Back to default profile</span>
	</button>
</div>
```
