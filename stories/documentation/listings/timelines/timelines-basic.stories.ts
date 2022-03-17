import { Meta, Story } from '@storybook/angular';

interface TimelinesBasicStory {
	state: string;
	number: boolean;
}

export default {
	title: 'Documentation/Listings/Timelines/Basic',
	argTypes: {
		state: {
			options: ['', 'success', 'warning'],
			control: {
				type: 'radio',
			}
		},
		number: {
			control: {
				type: 'boolean',
			}
		},
	},
} as Meta;

function getTemplate(args: TimelinesBasicStory): string {
	let stateGauge = '';
	let stateTxt = '';
	if (args.state === 'warning') {
		stateGauge = 'palette-warning';
		stateTxt = 'u-textWarning';
	}
	else if (args.state === 'success') {
		stateGauge = 'palette-success';
		stateTxt = 'u-textSuccess';
	}
	const number = args.number ? `mod-number` : '';
	return `
	<ol class="timeline ${stateTxt} ${number}">
		<li class="timeline-step">
			<span class="timeline-step-title">
				<a href="#" class="timeline-step-title-action">Previous step</a>
			</span>
			<div class="gauge mod-thin ${stateGauge}">
				<div class="gauge-bar"></div>
			</div>
		</li>
		<li class="timeline-step" aria-current="step">
			<span class="timeline-step-title">
				Current step
			</span>
			<div class="gauge mod-thin ${stateGauge}">
				<div class="gauge-bar" style="width: 50%"></div>
			</div>
		</li>
		<li class="timeline-step">
			<span class="timeline-step-title">
				Next step
			</span>
			<div class="gauge mod-thin">
				<div class="gauge-bar"></div>
			</div>
		</li>
		<li class="timeline-step">
			<span class="timeline-step-title">
				Final step
			</span>
			<div class="gauge mod-thin">
				<div class="gauge-bar"></div>
			</div>
		</li>
	</ol>
	`
}

const Template: Story<TimelinesBasicStory> = (args: TimelinesBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { state: '', number: false };
