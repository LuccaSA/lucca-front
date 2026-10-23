# progress-stepper — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-progress-stepper-angular-basic--docs)

## Angular

Component selector : `lu-progress-stepper`

### Basic

```js
import { provideRouter, RouterLink } from '@angular/router';
import { ProgressStepperComponent, ProgressStepperStepComponent } from '@lucca-front/ng/progress-stepper';
```

```html
<lu-progress-stepper current="3">
	<lu-progress-stepper-step [routerLinkParam]="'./route/step-1'" label="Step" />
	<lu-progress-stepper-step [routerLinkParam]="'./route/step-2'" label="Step" />
	<lu-progress-stepper-step label="Step" />
	<lu-progress-stepper-step label="Step" />
	<lu-progress-stepper-step label="Step" />
</lu-progress-stepper>
```

### Route

```js
import { provideRouter, RouterLink } from '@angular/router';
import { ProgressStepperComponent, ProgressStepperStepComponent } from '@lucca-front/ng/progress-stepper';
```

```html
<lu-progress-stepper current="2" steps="3">
	<lu-progress-stepper-step [routerLinkParam]="{ commands: '/route/step-1', fragment: 'home' }" label="Home page" />
	<lu-progress-stepper-step
		[routerLinkParam]="{ commands: ['route', 'step', '2'], fragment: 'config' }"
		label="Config page"
	/>
	<lu-progress-stepper-step [routerLinkParam]="{ commands: '/route/step-3', fragment: 'edit' }" label="Edit page" />
</lu-progress-stepper>
```

## HTML/CSS

Classe CSS : `.progressStepper`

### Basic

```css
@forward '@lucca-front/scss/src/components/progressStepper';
```

```html
<div class="progressStepper">
	<ol class="progressStepper-list">
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional" #link>
				<span class="progressStepper-list-step-number" aria-hidden="true"></span>
				<span class="progressStepper-list-step-title">
					<span
						luTooltip
						luTooltipWhenEllipsis
						[luTooltipTriggerAnchor]="link"
						class="progressStepper-list-step-title-content"
					>
						Step
					</span>
				</span>
			</a>
		</li>
		<li class="progressStepper-list-step" aria-current="step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">
				<span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Step</span>
			</span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">
				<span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Step</span>
			</span>
		</li>
	</ol>
</div>
```

### States

```css
@forward '@lucca-front/scss/src/components/progressStepper';
```

```html
<div class="progressStepper">
	<ol class="progressStepper-list">
		<li class="progressStepper-list-step is-success">
			<a href="#" class="progressStepper-list-step-linkOptional" #link1>
				<span class="progressStepper-list-step-number" aria-hidden="true"></span>
				<span class="progressStepper-list-step-title">
					<span
						luTooltip
						luTooltipWhenEllipsis
						[luTooltipTriggerAnchor]="link1"
						class="progressStepper-list-step-title-content"
					>
						Step success
					</span>
				</span>
			</a>
		</li>
		<li class="progressStepper-list-step is-critical">
			<a href="#" class="progressStepper-list-step-linkOptional" #link2>
				<span class="progressStepper-list-step-number" aria-hidden="true"></span>
				<span class="progressStepper-list-step-title">
					<span
						luTooltip
						luTooltipWhenEllipsis
						[luTooltipTriggerAnchor]="link2"
						class="progressStepper-list-step-title-content"
					>
						Step critical
					</span>
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

### Steps

```css
@forward '@lucca-front/scss/src/components/progressStepper';
```

```html
<div class="progressStepper">
	<ol class="progressStepper-list">
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional" #link1>
				<span class="progressStepper-list-step-number" aria-hidden="true"></span>
				<span class="progressStepper-list-step-title">
					<span
						luTooltip
						luTooltipWhenEllipsis
						[luTooltipTriggerAnchor]="link1"
						class="progressStepper-list-step-title-content"
					>
						Lorem ipsum dolor
					</span>
				</span>
			</a>
		</li>
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional" #link2>
				<span class="progressStepper-list-step-number" aria-hidden="true"></span>
				<span class="progressStepper-list-step-title">
					<span
						luTooltip
						luTooltipWhenEllipsis
						[luTooltipTriggerAnchor]="link2"
						class="progressStepper-list-step-title-content"
					>
						Lorem ipsum dolor
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
				<span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem ipsum dolor</span>
			</span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">
				<span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem ipsum dolor</span>
			</span>
		</li>
	</ol>
</div>
<div class="progressStepper">
	<ol class="progressStepper-list">
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional" #link3>
				<span class="progressStepper-list-step-number" aria-hidden="true"></span>
				<span class="progressStepper-list-step-title">
					<span
						luTooltip
						luTooltipWhenEllipsis
						[luTooltipTriggerAnchor]="link3"
						class="progressStepper-list-step-title-content"
					>
						Lorem ipsum dolor
					</span>
				</span>
			</a>
		</li>
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional" #link4>
				<span class="progressStepper-list-step-number" aria-hidden="true"></span>
				<span class="progressStepper-list-step-title">
					<span
						luTooltip
						luTooltipWhenEllipsis
						[luTooltipTriggerAnchor]="link4"
						class="progressStepper-list-step-title-content"
					>
						Lorem ipsum dolor
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
				<span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem ipsum dolor</span>
			</span>
		</li>
	</ol>
</div>
<div class="progressStepper">
	<ol class="progressStepper-list">
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional" #link5>
				<span class="progressStepper-list-step-number" aria-hidden="true"></span>
				<span class="progressStepper-list-step-title">
					<span
						luTooltip
						luTooltipWhenEllipsis
						[luTooltipTriggerAnchor]="link5"
						class="progressStepper-list-step-title-content"
					>
						Lorem ipsum dolor
					</span>
				</span>
			</a>
		</li>
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional" #link6>
				<span class="progressStepper-list-step-number" aria-hidden="true"></span>
				<span class="progressStepper-list-step-title">
					<span
						luTooltip
						luTooltipWhenEllipsis
						[luTooltipTriggerAnchor]="link6"
						class="progressStepper-list-step-title-content"
					>
						Lorem ipsum dolor
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
	</ol>
</div>
<div class="progressStepper">
	<ol class="progressStepper-list">
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional" #link7>
				<span class="progressStepper-list-step-number" aria-hidden="true"></span>
				<span class="progressStepper-list-step-title">
					<span
						luTooltip
						luTooltipWhenEllipsis
						[luTooltipTriggerAnchor]="link7"
						class="progressStepper-list-step-title-content"
					>
						Lorem ipsum dolor
					</span>
				</span>
			</a>
		</li>
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional" #link8>
				<span class="progressStepper-list-step-number" aria-hidden="true"></span>
				<span class="progressStepper-list-step-title">
					<span
						luTooltip
						luTooltipWhenEllipsis
						[luTooltipTriggerAnchor]="link8"
						class="progressStepper-list-step-title-content"
					>
						Lorem ipsum dolor
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
	</ol>
</div>
<div class="progressStepper">
	<ol class="progressStepper-list">
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional" #link9>
				<span class="progressStepper-list-step-number" aria-hidden="true"></span>
				<span class="progressStepper-list-step-title">
					<span
						luTooltip
						luTooltipWhenEllipsis
						[luTooltipTriggerAnchor]="link9"
						class="progressStepper-list-step-title-content"
					>
						Lorem ipsum dolor
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
	</ol>
</div>
```
