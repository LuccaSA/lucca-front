import { Meta, StoryObj } from '@storybook/angular';

interface CalloutKillableStory {}

export default {
	title: 'Documentation/Feedback/Callout/HTML & CSS/Killable',
	argTypes: {},
} as Meta;

function getTemplate(args: CalloutKillableStory): string {
	return `<div class="callout">
	<div class="callout-content">
		<div class="callout-content-description">Feedback description</div>
	</div>
	<button type="button" class="callout-kill"></button>
</div>`;
}

const Template = (args: CalloutKillableStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Killable: StoryObj<CalloutKillableStory> = {
	args: {},
	render: Template,
};
