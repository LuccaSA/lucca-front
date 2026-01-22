import { Meta, StoryObj } from '@storybook/angular';

interface ChipUnkillableStory {}

export default {
	title: 'Documentation/Listings/Chip/HTML&CSS/Unkillable',
	argTypes: {},
} as Meta;

function getTemplate(args: ChipUnkillableStory): string {
	return `<div class="chip">Label</div>`;
}

const Template = (args: ChipUnkillableStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Unkillable: StoryObj<ChipUnkillableStory> = {
	args: {},
	render: Template,
};
