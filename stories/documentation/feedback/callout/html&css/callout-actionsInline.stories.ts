import { Meta, StoryObj } from '@storybook/angular';

interface CalloutActionsInlineStory {}

export default {
	title: 'Documentation/Feedback/Callout/HTML & CSS/Actions inline',
	argTypes: {},
} as Meta;

function getTemplate(args: CalloutActionsInlineStory): string {
	return `<div class="callout">
	<div class="callout-content">
		<div class="callout-content-description">
			Feedback description
			<div class="callout-content-description-actions mod-inline">
				<button class="button mod-outlined" type="button">Button</button>
				<button class="button mod-ghost" type="button">Button</button>
			</div>
		</div>
	</div>
</div>`;
}

const Template = (args: CalloutActionsInlineStory) => ({
	props: args,
	template: getTemplate(args),
});

export const ActionsInline: StoryObj<CalloutActionsInlineStory> = {
	args: {},
	render: Template,
};
