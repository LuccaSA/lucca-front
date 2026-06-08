# callout-popover — Custom _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/calloutPopover';
```

```html
<button type="button" class="calloutPopover palette-cleemy">
	<span aria-hidden="true" class="calloutPopover-icon lucca-icon icon-soundMegaphone"></span>
	Lorem
</button>
<div class="lu-popover-content calloutPopover-overlay palette-cleemy">
	<div class="pr-u-flexShrink0">
		<span aria-hidden="true" class="calloutPopover-overlay-icon lucca-icon icon-soundMegaphone"></span>
	</div>
	<div class="pr-u-flexGrow1">
		<div class="calloutPopover-overlay-content">Ipsum dolor</div>
	</div>
</div>
```
