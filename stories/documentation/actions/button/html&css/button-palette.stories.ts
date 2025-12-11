import { Meta, StoryObj } from '@storybook/angular';

interface ButtonPaletteStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/Palette',
} as Meta;

function getTemplate(args: ButtonPaletteStory): string {
	return `<button type="button" class="button palette-success">Button</button>
<button type="button" class="button palette-warning">Button</button>
<button type="button" class="button palette-error">Button</button>`;
}

const Template = (args: ButtonPaletteStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: flex;
			gap: 1rem;
		}
	`,
	],
});

export const PaletteButton: StoryObj<ButtonPaletteStory> = {
	args: {},
	render: Template,
};
