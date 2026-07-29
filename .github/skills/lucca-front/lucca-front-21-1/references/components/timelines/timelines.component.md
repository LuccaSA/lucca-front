# timelines — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-listings-timelines-basic--docs)

## HTML/CSS

### Basic

```html
<ol class="timeline">
	<li class="timeline-step">
		<span class="timeline-step-title">
			<a href="#" class="timeline-step-title-action">Previous step</a>
		</span>
	</li>
	<li class="timeline-step" aria-current="step">
		<span class="timeline-step-title">Current step</span>
	</li>
	<li class="timeline-step">
		<span class="timeline-step-title">Next step</span>
	</li>
	<li class="timeline-step">
		<span class="timeline-step-title">Final step</span>
	</li>
</ol>
```

### Checked

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

### Dashed

```html
<ol class="timeline mod-dashed">
	<li class="timeline-step">
		<span class="timeline-step-title">
			<a href="#" class="timeline-step-title-action">Previous step</a>
		</span>
	</li>
	<li class="timeline-step" aria-current="step">
		<span class="timeline-step-title">Current step</span>
	</li>
	<li class="timeline-step">
		<span class="timeline-step-title">Next step</span>
	</li>
	<li class="timeline-step">
		<span class="timeline-step-title">Final step</span>
	</li>
</ol>
```

### Progress

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

### Vertical

<callout background="2" fullWidth="true">

Vous pouvez modifier le niveau des titres en l’adaptant à votre plan documentaire.

</callout>

```html
<ol class="timeline mod-vertical">
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
