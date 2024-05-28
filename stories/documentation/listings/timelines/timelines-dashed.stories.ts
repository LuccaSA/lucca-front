import { Meta, StoryFn } from '@storybook/angular';

interface TimelinesDashedStory {
	number: boolean;
	size: string;
}

export default {
	title: 'Documentation/Listings/Timelines/Dashed',
	argTypes: {
	},
} as Meta;

function getTemplate(args: TimelinesDashedStory): string {
	return `
	<ol class="timeline mod-dashed">
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

const Template: StoryFn<TimelinesDashedStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Dashed = Template.bind({});
Dashed.args = { };
