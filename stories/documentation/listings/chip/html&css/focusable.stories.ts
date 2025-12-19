import { Meta, StoryFn } from '@storybook/angular';

interface ChipFocusableStory {}

export default {
	title: 'Documentation/Listings/Chip/HTML&CSS/Focusable',
	argTypes: {},
} as Meta;

function getTemplate(args: ChipFocusableStory): string {
	return `<button type="button" class="chip">
	Label
</button>`;
}

const Template: StoryFn<ChipFocusableStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Focusable = Template.bind({});
Focusable.args = {};
