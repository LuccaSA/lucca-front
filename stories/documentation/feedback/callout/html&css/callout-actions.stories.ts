import { Meta, StoryFn } from '@storybook/angular';

interface CalloutActionStory {}

export default {
	title: 'Documentation/Feedback/Callout/HTML & CSS/Action',
	argTypes: {},
} as Meta;

function getTemplate(args: CalloutActionStory): string {
	return `<div class="callout">
	<div class="callout-content">
		<div class="callout-content-description">
			Feedback description
			<div class="callout-content-description-actions">
				<button class="button mod-outlined" type="button">Button</button>
				<button class="button mod-text" type="button">Button</button>
			</div>
		</div>
	</div>
</div>`;
}

const Template: StoryFn<CalloutActionStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Action = Template.bind({});
Action.args = {};
