import { Meta, StoryFn } from '@storybook/angular';

interface ChipFeedbackStory {}

export default {
	title: 'Documentation/Listings/Chip/HTML&CSS/Feedback',
	argTypes: {},
} as Meta;

function getTemplate(args: ChipFeedbackStory): string {
	return `<div class="chip palette-warning">
	<span aria-hidden="true" class="chip-icon lucca-icon icon-signWarning"></span>
	John Doe
	<button type="button" class="chip-kill">
		<span class="pr-u-mask">delete</span>
	</button>
</div>
<div class="chip palette-critical">
	<span aria-hidden="true" class="chip-icon lucca-icon icon-signError"></span>
	John Doe
	<button type="button" class="chip-kill">
		<span class="pr-u-mask">delete</span>
	</button>
</div>`;
}

const Template: StoryFn<ChipFeedbackStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`:host {
			display: flex;
			gap: var(--pr-t-spacings-50);
		}`,
	],
});

export const Feedback = Template.bind({});
Feedback.args = {};
