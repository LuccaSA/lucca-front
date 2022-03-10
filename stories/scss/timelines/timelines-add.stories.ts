import { Meta, Story } from '@storybook/angular';

interface TimelinesAddStepStory {
}

export default {
	title: 'SCSS/Timelines/Add Step',
	argTypes: {
	},
} as Meta;

function getTemplate(args: TimelinesAddStepStory): string {
	const classes = [].filter(Boolean).join(' ');
	return `
	<ol class="timeline mod-smallNumber mod-vertical mod-add">
		<li class="timeline-step">
			<span class="timeline-step-title">
				<a href="#" class="timeline-step-title-action">Previous step</a>
			</span>
			<div class="gauge mod-vertical mod-thin">
				<div class="gauge-bar"></div>
			</div>
	        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi voluptas sit facere ipsum, veniam rerum aliquam ut delectus aperiam deserunt cum nulla magnam et laborum sequi natus dolorem repudiandae.
		</li>
		<li class="timeline-step">
			<span class="timeline-step-title">
				Final step
			</span>
			<div class="gauge mod-vertical mod-thin">
				<div class="gauge-bar"></div>
			</div>
	        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi voluptas sit facere ipsum, veniam rerum aliquam ut delectus aperiam deserunt cum nulla magnam et laborum sequi natus dolorem repudiandae.
		</li>
		<li class="timeline-step">
			<span class="timeline-step-title">
				<button class="button mod-small timeline-step-addLast">
					Add step
				</button>
			</span>
		</li>
	</ol>
	`
}

const Template: Story<TimelinesAddStepStory> = (args: TimelinesAddStepStory) => ({
	props: args,
	template: getTemplate(args),
});

export const AddStep = Template.bind({});
AddStep.args = {};
