import { Meta, StoryObj } from '@storybook/angular';

interface ChipBasicStory {}

export default {
	title: 'Documentation/Listings/Chip/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: ChipBasicStory): string {
	return `<div class="chip">
	Label
	<button type="button" class="chip-kill">
		<span class="pr-u-mask">delete</span>
	</button>
</div>`;
}

const Template = (args: ChipBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<ChipBasicStory> = {
	args: {},
	render: Template,
};
