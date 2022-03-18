import { Meta, Story } from '@storybook/angular';

interface TimelinesVerticalStory {
	number: boolean;
}

export default {
	title: 'Documentation/Listings/Timelines/Vertical',
	argTypes: {
		number: {
			control: {
				type: 'boolean',
			}
		},
	},
} as Meta;

function getTemplate(args: TimelinesVerticalStory): string {
	const number = args.number ? `mod-number mod-smallNumber` : '';
	return `
	<section class="timeline mod-vertical ${number}">
		<div class="timeline-step">
			<h2 class="timeline-step-title">
				<a href="#" class="timeline-step-title-action">Previous step</a>
			</h2>
			<div class="gauge mod-vertical mod-thin">
				<div class="gauge-bar"></div>
			</div>
			…
		</div>
		<div class="timeline-step" aria-current="step">
			<h2 class="timeline-step-title">
				Current step
			</h2>
			<div class="gauge mod-vertical mod-thin">
				<div class="gauge-bar" style="height: 50%"></div>
			</div>
			…
		</div>
		<div class="timeline-step">
			<h2 class="timeline-step-title">
				Next step
			</h2>
			<div class="gauge mod-vertical mod-thin">
				<div class="gauge-bar"></div>
			</div>
			…
		</div>
		<div class="timeline-step">
			<h2 class="timeline-step-title">
				Last step
			</h2>
			<div class="gauge mod-vertical mod-thin">
				<div class="gauge-bar"></div>
			</div>
			…
		</div>
	</section>
	`
}

const Template: Story<TimelinesVerticalStory> = (args: TimelinesVerticalStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Vertical = Template.bind({});
Vertical.args = {number: false};
