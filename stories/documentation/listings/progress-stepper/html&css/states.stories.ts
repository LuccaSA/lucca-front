import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata } from '@storybook/angular';

interface Story {}

export default {
	decorators: [
		moduleMetadata({
			imports: [LuTooltipTriggerDirective],
		}),
	],
	title: 'Documentation/Progress stepper/HTML&CSS/States',
	argTypes: {},
	render: (args: Story) => {
		return {
			template: `<div class="progressStepper">
	<ol class="progressStepper-list">
		<li class="progressStepper-list-step is-success">
			<a href="#" class="progressStepper-list-step-linkOptional">
				<span class="progressStepper-list-step-number" aria-hidden="true"></span>
				<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
			</a>
		</li>
		<li class="progressStepper-list-step is-critical">
			<a href="#" class="progressStepper-list-step-linkOptional">
				<span class="progressStepper-list-step-number" aria-hidden="true"></span>
				<span class="progressStepper-list-step-title"><span luTooltip luTooltipWhenEllipsis class="progressStepper-list-step-title-content">Lorem ipsum dolor</span></span>
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
</div>`,
		};
	},
} as Meta;

export const Basic = {};
