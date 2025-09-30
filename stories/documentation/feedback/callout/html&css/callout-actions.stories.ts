import { Meta, StoryFn } from '@storybook/angular';

interface CalloutActionsStory {}

export default {
	title: 'Documentation/Feedback/Callout/HTML & CSS/Actions',
	argTypes: {},
} as Meta;

function getTemplate(args: CalloutActionsStory): string {
	return `<div class="callout">
	<div class="callout-content">
		<div class="callout-content-description">
			Feedback description
			<div class="callout-content-description-actions">
				<button class="button mod-outlined" type="button">Button</button>
				<button class="button mod-ghost" type="button">Button</button>
			</div>
		</div>
	</div>
</div>`;
}

const Template: StoryFn<CalloutActionsStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Actions = Template.bind({});
Actions.args = {};
