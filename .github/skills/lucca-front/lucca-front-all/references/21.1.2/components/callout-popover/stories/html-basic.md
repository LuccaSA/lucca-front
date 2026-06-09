# callout-popover — Basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/calloutFeedbackList';
@forward '@lucca-front/scss/src/components/calloutPopover';
```

```html
<button type="button" class="calloutPopover">
	<span aria-hidden="true" class="calloutPopover-icon lucca-icon icon-signInfo"></span>
	1
</button>
<div class="lu-popover-content calloutPopover-overlay">
	<div class="pr-u-flexShrink0">
		<span aria-hidden="true" class="calloutPopover-overlay-icon lucca-icon icon-signInfo"></span>
	</div>
	<div class="pr-u-flexGrow1">
		<div class="calloutPopover-overlay-head">
			<strong class="calloutPopover-overlay-head-title">Titre</strong>
		</div>
		<div class="calloutPopover-overlay-content">
			<ul class="calloutFeedbackList">
				<li class="calloutFeedbackList-item">
					<p class="calloutFeedbackList-item-description">Feedback description.</p>
					<div class="calloutFeedbackList-item-actions">
						<a href class="button mod-outlined">Button</a>
						<button type="button" class="button mod-ghost">Button</button>
					</div>
				</li>
				<li class="calloutFeedbackList-item">
					<p class="calloutFeedbackList-item-description">Feedback description.</p>
					<div class="calloutFeedbackList-item-actions">
						<a href class="button mod-outlined">Button</a>
						<button type="button" class="button mod-ghost">Button</button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>
```
