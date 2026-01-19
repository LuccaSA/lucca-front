import { Meta, StoryObj } from '@storybook/angular';

interface ChipPalettesStory {}

export default {
	title: 'Documentation/Listings/Chip/HTML&CSS/Palettes',
	argTypes: {},
} as Meta;

function getTemplate(args: ChipPalettesStory): string {
	return `<div class="chip palette-product">
	Label
	<button type="button" class="chip-kill">
		<span class="pr-u-mask">delete</span>
	</button>
</div>`;
}

const Template = (args: ChipPalettesStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Palettes: StoryObj<ChipPalettesStory> = {
	args: {},
	render: Template,
};
