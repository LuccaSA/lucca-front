import { Meta, StoryFn } from '@storybook/angular';

interface CalloutBasicStory {}

export default {
	title: 'Documentation/Feedback/Callout/HTML & CSS/AI',
	argTypes: {},
} as Meta;

function getTemplate(args: CalloutBasicStory): string {
	return `<div class="callout mod-AI">
	<div class="callout-icon">
		<span aria-hidden="true" class="lucca-icon icon-weatherStars"></span>
	</div>
	<div class="callout-content">
		<div class="callout-content-description">Feedback description</div>
	</div>
</div>`;
}

const Template: StoryFn<CalloutBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
