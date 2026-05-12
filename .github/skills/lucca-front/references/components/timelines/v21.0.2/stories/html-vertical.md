# timelines — Vertical _(HTML/CSS)_

<callout background="2" fullWidth="true">

Vous pouvez modifier le niveau des titres en l’adaptant à votre plan documentaire.

</callout>

```css
@forward '@lucca-front/scss/src/components/time';
@forward '@lucca-front/scss/src/components/timeline';
```

```html
<ol class="timeline mod-vertical ${…} ${…}">
	<li class="timeline-step">
		<div class="timeline-step-title">
			<a href="#" class="timeline-step-title-action">Previous step</a>
		</div>
		<div class="timeline-step-description">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi voluptas sit facere ipsum, veniam rerum
			aliquam ut delectus aperiam deserunt cum nulla magnam et laborum sequi natus dolorem repudiandae.
		</div>
	</li>
	<li class="timeline-step" aria-current="step">
		<div class="timeline-step-title">Current step</div>
		<div class="timeline-step-description">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure porro atque, laboriosam at vitae expedita ab
			recusandae voluptas obcaecati commodi deleniti enim doloremque? Consequuntur quisquam natus obcaecati recusandae
			officia dicta. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi voluptas sit facere ipsum,
			veniam rerum aliquam ut delectus aperiam deserunt cum nulla magnam et laborum sequi natus dolorem repudiandae.
		</div>
	</li>
	<li class="timeline-step">
		<div class="timeline-step-title">Next step</div>
		<div class="timeline-step-description">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi voluptas sit facere ipsum, veniam rerum
			aliquam ut delectus aperiam deserunt cum nulla magnam et laborum sequi natus dolorem repudiandae.
		</div>
	</li>
	<li class="timeline-step">
		<div class="timeline-step-title">Last step</div>
		<div class="timeline-step-description">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi voluptas sit facere ipsum, veniam rerum
			aliquam ut delectus aperiam deserunt cum nulla magnam et laborum sequi natus dolorem repudiandae.
		</div>
	</li>
</ol>
```
