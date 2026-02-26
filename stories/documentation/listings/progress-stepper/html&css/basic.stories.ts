import { Meta } from '@storybook/angular';

interface Story {}

export default {
	title: 'Documentation/Progress stepper/HTML&CSS/Basic',
	argTypes: {},
	render: (args: Story) => {
		return {
			template: `<div class="progressStepper">
	<ol class="progressStepper-list palette-coreHR">
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">Lorem ipsum dolor</span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">Lorem ipsum dolor</span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">Lorem ipsum dolor</span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">Lorem ipsum dolor</span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">Lorem ipsum dolor</span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">Lorem ipsum dolor</span>
		</li>
	</ol>
</div>
<div class="progressStepper">
	<ol class="progressStepper-list palette-coreHR">
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">Lorem ipsum dolor</span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">Lorem ipsum dolor</span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">Lorem ipsum dolor</span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">Lorem ipsum dolor</span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">Lorem ipsum dolor</span>
		</li>
	</ol>
</div>
<div class="progressStepper">
	<ol class="progressStepper-list palette-coreHR">
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">Lorem ipsum dolor</span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">Lorem ipsum dolor</span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">Lorem ipsum dolor</span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">Lorem ipsum dolor</span>
		</li>
	</ol>
</div>
<div class="progressStepper">
	<ol class="progressStepper-list palette-coreHR">
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">Lorem ipsum dolor</span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">Lorem ipsum dolor</span>
		</li>
		<li class="progressStepper-list-step">
			<span class="progressStepper-list-step-number" aria-hidden="true"></span>
			<span class="progressStepper-list-step-title">Lorem ipsum dolor</span>
		</li>
	</ol>
</div>`,
		};
	},
} as Meta;

export const Basic = {};
