# timelines — Checked _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/time';
@forward '@lucca-front/scss/src/components/timeline';
```

```html
<ol class="timeline mod-checkedPastStep mod-number">
	<li class="timeline-step">
		<div class="timeline-step-title">
			<span class="timeline-step-title-icon" aria-hidden="true"></span>
			<a href="#" class="timeline-step-title-action">Previous step</a>
		</div>
	</li>
	<li class="timeline-step">
		<div class="timeline-step-title">
			<span class="timeline-step-title-icon" aria-hidden="true"></span>
			<a href="#" class="timeline-step-title-action">Previous step</a>
		</div>
	</li>
	<li class="timeline-step" aria-current="step">
		<div class="timeline-step-title">
			<span class="timeline-step-title-icon" aria-hidden="true"></span>
			Current step
		</div>
	</li>
	<li class="timeline-step">
		<div class="timeline-step-title">
			<span class="timeline-step-title-icon" aria-hidden="true"></span>
			Last step
		</div>
	</li>
</ol>
```
