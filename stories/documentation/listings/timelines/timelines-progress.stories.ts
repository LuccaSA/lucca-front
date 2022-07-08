import { Meta, Story } from '@storybook/angular';

interface TimelinesProgressStory {
	width: number;
}

export default {
	title: 'Documentation/Listings/Timelines/Progress',
	argTypes: {
		progress: {
			control: {
				type: 'range',
				min: 0,
				max: 100,
				step: 1,
			},
		},
	},
} as Meta;

function getTemplate(args: TimelinesProgressStory): string {
	return `
	<ol class="timeline mod-progress">
		<li class="timeline-step">
			<div class="timeline-step-title">
				First step
			</div>
		</li>
		<li class="timeline-step" aria-current="step" [attr.style]="'--progress:' + progress + '%'">
			<div class="timeline-step-title">
				Current step
			</div>
		</li>
		<li class="timeline-step">
			<div class="timeline-step-title">
				Next step
			</div>
		</li>
	</ol>
	`;
}

const Template: Story<TimelinesProgressStory> = (args: TimelinesProgressStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Progress = Template.bind({});
Progress.args = { progress: 50 };
