# progress-stepper — Basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/progress-stepper';
```

```html
<div class="progressStepper">
	<ol class="progressStepper-list">
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional">
				<span class="progressStepper-list-step-number" aria-hidden="true"></span>
				<span class="progressStepper-list-step-title">
					<span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem</span>
				</span>
			</a>
		</li>
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional">
				<span class="progressStepper-list-step-number" aria-hidden="true"></span>
				<span class="progressStepper-list-step-title">
					<span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">
						Lorem ipsum dolor sit amet
					</span>
				</span>
			</a>
		</li>
		<li class="progressStepper-list-step" aria-current="step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">
				<span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem ipsum dolor</span>
			</span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">
				<span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem ipsum dolor</span>
			</span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">
				<span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">
					Lorem ipsum dolor sit amet
				</span>
			</span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">
				<span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem ipsum</span>
			</span>
		</li>
	</ol>
</div>
```
