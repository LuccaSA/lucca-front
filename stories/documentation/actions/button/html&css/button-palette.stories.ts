import { Meta, StoryFn } from '@storybook/angular';

interface ButtonPaletteStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/Palette',
} as Meta;

function getTemplate(args: ButtonPaletteStory): string {
	return `<div class="u-displayFlex u-gapXS u-alignItemsCenter">
	<button type="button" class="button palette-success">Button</button>
	<button type="button" class="button palette-warning">Button</button>
	<button type="button" class="button palette-error">Button</button>
</div>`;
}

const Template: StoryFn<ButtonPaletteStory> = (args: ButtonPaletteStory) => ({
	props: args,
	template: getTemplate(args),
});

export const PaletteButton = Template.bind({});
PaletteButton.args = {};
