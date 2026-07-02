# progress-stepper — States _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/progress-stepper';
```

```html
<div class="progressStepper">
	<ol class="progressStepper-list">
		<li class="progressStepper-list-step is-success">
			<a href="#" class="progressStepper-list-step-linkOptional">
				<span class="progressStepper-list-step-number" aria-hidden="true"></span>
				<span class="progressStepper-list-step-title">
					<span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Step success</span>
				</span>
			</a>
		</li>
		<li class="progressStepper-list-step is-critical">
			<a href="#" class="progressStepper-list-step-linkOptional">
				<span class="progressStepper-list-step-number" aria-hidden="true"></span>
				<span class="progressStepper-list-step-title">
					<span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Step critical</span>
				</span>
			</a>
		</li>
		<li class="progressStepper-list-step" aria-current="step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">
				<span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Step current</span>
			</span>
		</li>
	</ol>
</div>
```
