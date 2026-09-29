import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata } from '@storybook/angular-vite';

interface Story {}

export default {
	decorators: [
		moduleMetadata({
			imports: [LuTooltipTriggerDirective],
		}),
	],
	title: 'Documentation/Progress stepper/HTML&CSS/Steps',
	argTypes: {},
	render: (args: Story) => {
		return {
			styles: [`.progressStepper + .progressStepper { margin-block-start: var(--pr-t-spacings-200) }`],
			template: `<div class="progressStepper">
	<ol class="progressStepper-list">
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional" #link1>
					<span class="progressStepper-list-step-number" aria-hidden="true"></span>
					<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis [luTooltipDelegateTrigger]="link1" class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
				</a>
		</li>
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional" #link2>
					<span class="progressStepper-list-step-number" aria-hidden="true"></span>
					<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis [luTooltipDelegateTrigger]="link2" class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
				</a>
		</li>
		<li class="progressStepper-list-step" aria-current="step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
		</li>
		<li class="progressStepper-list-step" >
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
		</li>
	</ol>
</div>
<div class="progressStepper">
	<ol class="progressStepper-list">
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional" #link3>
					<span class="progressStepper-list-step-number" aria-hidden="true"></span>
					<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis [luTooltipDelegateTrigger]="link3" class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
				</a>
		</li>
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional" #link4>
					<span class="progressStepper-list-step-number" aria-hidden="true"></span>
					<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis [luTooltipDelegateTrigger]="link4" class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
				</a>
		</li>
		<li class="progressStepper-list-step" aria-current="step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
		</li>
		<li class="progressStepper-list-step" >
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
		</li>
	</ol>
</div>
<div class="progressStepper">
	<ol class="progressStepper-list">
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional" #link5>
					<span class="progressStepper-list-step-number" aria-hidden="true"></span>
					<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis [luTooltipDelegateTrigger]="link5" class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
				</a>
		</li>
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional" #link6>
					<span class="progressStepper-list-step-number" aria-hidden="true"></span>
					<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis [luTooltipDelegateTrigger]="link6" class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
				</a>
		</li>
		<li class="progressStepper-list-step" aria-current="step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
		</li>
	</ol>
</div>
<div class="progressStepper">
	<ol class="progressStepper-list">
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional" #link7>
					<span class="progressStepper-list-step-number" aria-hidden="true"></span>
					<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis [luTooltipDelegateTrigger]="link7" class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
				</a>
		</li>
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional" #link8>
					<span class="progressStepper-list-step-number" aria-hidden="true"></span>
					<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis [luTooltipDelegateTrigger]="link8" class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
				</a>
		</li>
		<li class="progressStepper-list-step" aria-current="step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
		</li>
	</ol>
</div>
<div class="progressStepper">
	<ol class="progressStepper-list">
		<li class="progressStepper-list-step">
			<a href="#" class="progressStepper-list-step-linkOptional" #link9>
					<span class="progressStepper-list-step-number" aria-hidden="true"></span>
					<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis [luTooltipDelegateTrigger]="link9" class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
				</a>
		</li>
		<li class="progressStepper-list-step" aria-current="step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
		</li>
	</ol>
</div>
`,
		};
	},
} as Meta;

export const Basic = {};
