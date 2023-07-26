import { Meta, Story } from '@storybook/angular';

interface ButtonCounterStory {}

export default {
	title: 'Documentation/Actions/Button/Counter',
} as Meta;

function getTemplate(args: ButtonCounterStory): string {
	return `
	<button type="button" class="button">Bouton<div class="numericBadge palette-primary">7</div></button>
	`;
}

const Template: Story<ButtonCounterStory> = (args: ButtonCounterStory) => ({
	props: args,
	template: getTemplate(args),
});

export const CounterButton = Template.bind({});
CounterButton.args = {};
