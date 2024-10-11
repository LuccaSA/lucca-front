import { Meta, StoryFn } from '@storybook/angular';

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

const Template: StoryFn<CalloutKillableStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Killable = Template.bind({});
Killable.args = {};
