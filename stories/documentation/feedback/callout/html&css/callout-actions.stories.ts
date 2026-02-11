import { Meta, StoryObj } from '@storybook/angular';

interface CalloutActionsStory {}

export default {
	title: 'Documentation/Feedback/Callout/HTML&CSS/Actions',
	argTypes: {},
} as Meta;

function getTemplate(args: CalloutActionsStory): string {
	return `<div class="callout">
	<div class="callout-content">
		<div class="callout-content-description">
			<p>Feedback description</p>
			<div class="callout-content-description-actions">
				<button class="button mod-outlined" type="button">Button</button>
				<button class="button mod-ghost" type="button">Button</button>
			</div>
		</div>
	</div>
</div>`;
}

const Template = (args: CalloutActionsStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Actions: StoryObj<CalloutActionsStory> = {
	args: {},
	render: Template,
};
