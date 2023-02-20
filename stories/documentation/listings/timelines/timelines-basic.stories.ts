import { Meta, Story } from '@storybook/angular';

interface TimelinesBasicStory {
	number: boolean;
	size: string;
}

export default {
	title: 'Documentation/Listings/Timelines/Basic',
	argTypes: {
		number: {
			control: {
				type: 'boolean',
			},
		},
		size: {
			options: ['', 'mod-S', 'mod-L'],
			control: {
				type: 'radio',
			},
		},
	},
} as Meta;

function getTemplate(args: TimelinesBasicStory): string {
	const classes = [args.size].filter(Boolean).join(' ');
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
	`;
}

const Template: Story<TimelinesBasicStory> = (args: TimelinesBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { number: false, size: '' };
