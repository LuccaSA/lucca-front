import { Meta, StoryFn } from '@storybook/angular';

interface TimelinesAddStepStory {}

export default {
	title: 'Documentation/Listings/Timelines/Add Step',
	argTypes: {},
} as Meta;

function getTemplate(args: TimelinesAddStepStory): string {
	return `
	<ol class="timeline mod-number mod-addStep">
		<li class="timeline-step">
			<div class="timeline-step-title">
				First step
			</div>
		</li>
		<li class="timeline-step">
			<div class="timeline-step-title">
				Second step
			</div>
		</li>
		<li class="timeline-step" aria-current="step">
			<div class="timeline-step-title">
				Current step
			</div>
		</li>
		<li class="timeline-step">
			<div class="timeline-step-title">
				<button type="button" class="button palette-grey mod-S u-positionStatic">
					<span class="timeline-step-title-icon" aria-hidden="true"></span>
					Add step
				</button>
			</div>
		</li>
	</ol>
	`;
}

const Template: StoryFn<TimelinesAddStepStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const AddStep = Template.bind({});
AddStep.args = {};
