# callout-disclosure — Status _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/calloutDisclosure';
@forward '@lucca-front/scss/src/components/calloutFeedbackList';
```

```html
<details class="calloutDisclosure palette-success">
	<summary class="calloutDisclosure-summary">
		<span aria-hidden="true" class="calloutDisclosure-summary-icon lucca-icon icon-signSuccess"></span>
		<span class="calloutDisclosure-summary-title">List title</span>
		<span aria-hidden="true" class="calloutDisclosure-summary-chevron lucca-icon icon-arrowChevronBottom"></span>
	</summary>
	<div class="calloutDisclosure-details">
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
</details>

<details class="calloutDisclosure palette-warning">
	<summary class="calloutDisclosure-summary">
		<span aria-hidden="true" class="calloutDisclosure-summary-icon lucca-icon icon-signWarning"></span>
		<span class="calloutDisclosure-summary-title">List title</span>
		<span aria-hidden="true" class="calloutDisclosure-summary-chevron lucca-icon icon-arrowChevronBottom"></span>
	</summary>
	<div class="calloutDisclosure-details">
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
</details>

<details class="calloutDisclosure palette-error">
	<summary class="calloutDisclosure-summary">
		<span aria-hidden="true" class="calloutDisclosure-summary-icon lucca-icon icon-signError"></span>
		<span class="calloutDisclosure-summary-title">List title</span>
		<span aria-hidden="true" class="calloutDisclosure-summary-chevron lucca-icon icon-arrowChevronBottom"></span>
	</summary>
	<div class="calloutDisclosure-details">
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
</details>
```
