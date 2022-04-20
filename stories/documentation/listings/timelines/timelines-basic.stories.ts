import { Meta, Story } from '@storybook/angular';

interface TimelinesBasicStory {
	state: string;
	number: boolean;
	size: string;
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
		size: {
			options: ['', 'mod-small', 'mod-big'],
			control: {
				type: 'radio',
			}
		},
	},
} as Meta;

function getTemplate(args: TimelinesBasicStory): string {
	const classes = [args.size].filter(Boolean).join(' ');
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
	<ol class="timeline ${classes} ${number}">
		<li class="timeline-step">
			<span class="timeline-step-title">
				<a href="#" class="timeline-step-title-action">Previous step</a>
			</span>
		</li>
		<li class="timeline-step" aria-current="step">
			<span class="timeline-step-title">
				Current step
			</span>
		</li>
		<li class="timeline-step">
			<span class="timeline-step-title">
				Next step
			</span>
		</li>
		<li class="timeline-step">
			<span class="timeline-step-title">
				Final step
			</span>
		</li>
	</ol>
	`
}

const Template: Story<TimelinesBasicStory> = (args: TimelinesBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { state: '', number: false, size: '' };
