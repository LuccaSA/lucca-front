import { Meta, StoryObj } from '@storybook/angular';

interface ButtonCounterStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/Counter',
} as Meta;

function getTemplate(args: ButtonCounterStory): string {
	return `<button type="button" class="button">Button<span class="numericBadge">7</span></button>
<button type="button" class="button palette-warning">Button<span class="numericBadge">7</span></button>
<button type="button" class="button palette-mint">Button<span class="numericBadge">7</span></button>`;
}

const Template = (args: ButtonCounterStory) => ({
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

export const CounterButton: StoryObj<ButtonCounterStory> = {
	args: {},
	render: Template,
};
