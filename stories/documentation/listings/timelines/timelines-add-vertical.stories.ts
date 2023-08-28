import { Meta, StoryFn } from '@storybook/angular';

interface TimelinesAddStepVerticalStory {}

export default {
	title: 'Documentation/Listings/Timelines/Add Step Vertical',
	argTypes: {},
} as Meta;

function getTemplate(args: TimelinesAddStepVerticalStory): string {
	return `
	<ol class="timeline mod-number mod-addStep mod-vertical">
		<li class="timeline-step">
			<div class="timeline-step-title">
				First step
			</div>
			<div class="timeline-step-description">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi voluptas sit facere ipsum, veniam rerum aliquam ut delectus aperiam deserunt cum nulla magnam et laborum sequi natus dolorem repudiandae.
			</div>
		</li>
		<li class="timeline-step">
			<div class="timeline-step-title">
				Second step
			</div>
			<div class="timeline-step-description">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi voluptas sit facere ipsum, veniam rerum aliquam ut delectus aperiam deserunt cum nulla magnam et laborum sequi natus dolorem repudiandae.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure porro atque, laboriosam at vitae expedita ab recusandae voluptas obcaecati commodi deleniti enim doloremque? Consequuntur quisquam natus obcaecati recusandae officia dicta.
			</div>
		</li>
		<li class="timeline-step" aria-current="step">
			<div class="timeline-step-title">
				Current step
			</div>
			<div class="timeline-step-description">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi voluptas sit facere ipsum, veniam rerum aliquam ut delectus aperiam deserunt cum nulla magnam et laborum sequi natus dolorem repudiandae.
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

const Template: StoryFn<TimelinesAddStepVerticalStory> = (args: TimelinesAddStepVerticalStory) => ({
	props: args,
	template: getTemplate(args),
});

export const AddStepVertical = Template.bind({});
AddStepVertical.args = {};
