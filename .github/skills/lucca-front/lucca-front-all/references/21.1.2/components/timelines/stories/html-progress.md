# timelines — Progress _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/time';
@forward '@lucca-front/scss/src/components/timeline';
```

```html
<ol class="timeline mod-progress">
	<li class="timeline-step">
		<div class="timeline-step-title">First step</div>
	</li>
	<li class="timeline-step" aria-current="step" [attr.style]="'--progress:' + progress + '%'">
		<div class="timeline-step-title">Current step</div>
	</li>
	<li class="timeline-step">
		<div class="timeline-step-title">Next step</div>
	</li>
</ol>
```
