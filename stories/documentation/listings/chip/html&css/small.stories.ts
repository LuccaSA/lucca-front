import { Meta, StoryObj } from '@storybook/angular';

interface ChipSmallStory {}

export default {
	title: 'Documentation/Listings/Chip/HTML&CSS/Small',
	argTypes: {},
} as Meta;

function getTemplate(args: ChipSmallStory): string {
	return `<div class="chip mod-S">
	Label
	<button type="button" class="chip-kill">
		<span class="pr-u-mask">delete</span>
	</button>
</div>`;
}

const Template = (args: ChipSmallStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Small: StoryObj<ChipSmallStory> = {
  args: {},
  render: Template,
}

