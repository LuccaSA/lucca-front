# empty-state — State section palette _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/empty-state';
@forward '@lucca-front/scss/src/components/bubbleIllustration';
@forward '@lucca-front/scss/src/components/button';
```

```html
<section class="emptyState">
	<div class="emptyState-container">
		<div class="emptyState-content">
			<div
				class="emptyState-content-icon bubbleIllustration mod-action mod-L palette-success"
				aria-hidden="true"
				[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/bubble-illustration/calendar.svg' | luSafeExternalSvg"
			></div>
			<div class="emptyState-content-text">
				<h3 class="emptyState-content-heading">Empty State</h3>
				<p class="emptyState-content-description">
					Flatus obsequiorum potest inanes pomerium obsequiorum credi homines vero caelibes orbos potest vile
					diversitate flatus.
				</p>
				<div class="emptyState-actions">
					<button type="button" class="button">Button</button>
					<button type="button" class="button mod-outlined">Button</button>
				</div>
			</div>
		</div>
	</div>
</section>
```
