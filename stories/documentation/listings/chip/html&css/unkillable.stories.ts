import { Meta, StoryFn } from '@storybook/angular';

interface ChipUnkillableStory {}

export default {
	title: 'Documentation/Listings/Chip/HTML&CSS/Unkillable',
	argTypes: {},
} as Meta;

function getTemplate(args: ChipUnkillableStory): string {
	return `<div class="chip">Label</div>`;
}

const Template: StoryFn<ChipUnkillableStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Unkillable = Template.bind({});
Unkillable.args = {};
