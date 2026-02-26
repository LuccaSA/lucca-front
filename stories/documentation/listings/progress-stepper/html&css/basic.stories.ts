import { Meta } from '@storybook/angular';

interface Story {}

export default {
	title: 'Documentation/Progress stepper/HTML&CSS/Basic',
	argTypes: {},
	render: (args: Story) => {
		return {
			template: `<ol class="progressStepper">
	<li class="progressStepper-step">
		<span class="progressStepper-step-number" aria-hidden="true"></span>
		<span class="progressStepper-step-title">Lorem ipsum dolor</span>
	</li>
	<li class="progressStepper-step is-completed">
		<span class="progressStepper-step-number" aria-hidden="true"></span>
		<span class="progressStepper-step-title">Lorem ipsum dolor</span>
	</li>
	<li class="progressStepper-step" aria-current="step">
		<span class="progressStepper-step-number" aria-hidden="true"></span>
		<span class="progressStepper-step-title">Lorem ipsum dolor</span>
	</li>
	<li class="progressStepper-step">
		<span class="progressStepper-step-number" aria-hidden="true"></span>
		<span class="progressStepper-step-title">Lorem ipsum dolor</span>
	</li>
	<li class="progressStepper-step">
		<span class="progressStepper-step-number" aria-hidden="true"></span>
		<span class="progressStepper-step-title">Lorem ipsum dolor</span>
	</li>
</ol>`,
		};
	},
} as Meta;

export const Basic = {};
