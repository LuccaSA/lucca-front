import { Meta, StoryObj } from '@storybook/angular';

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

const Template = (args: ChipFocusableStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Focusable: StoryObj<ChipFocusableStory> = {
  args: {},
  render: Template,
}

