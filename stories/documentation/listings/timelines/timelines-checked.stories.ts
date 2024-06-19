import { Meta, StoryFn } from '@storybook/angular';

interface TimelinesCheckedStory {}

export default {
	title: 'Documentation/Listings/Timelines/Checked',
} as Meta;

function getTemplate(args: TimelinesCheckedStory): string {
	return `
		<ol class="timeline mod-checkedPastStep mod-number">
			<li class="timeline-step">
				<div class="timeline-step-title">
					<span class="timeline-step-title-icon" aria-hidden="true"></span>
					<a href="#" class="timeline-step-title-action">Previous step</a>
				</div>
			</li>
			<li class="timeline-step">
				<div class="timeline-step-title">
					<span class="timeline-step-title-icon" aria-hidden="true"></span>
					<a href="#" class="timeline-step-title-action">Previous step</a>
				</div>
			</li>
			<li class="timeline-step" aria-current="step">
				<div class="timeline-step-title">
					<span class="timeline-step-title-icon" aria-hidden="true"></span>
					Current step
				</div>
			</li>
			<li class="timeline-step">
				<div class="timeline-step-title">
					<span class="timeline-step-title-icon" aria-hidden="true"></span>
					Last step
				</div>
			</li>
		</ol>
	`;
}

const Template: StoryFn<TimelinesCheckedStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Checked = Template.bind({});
Checked.args = {};
