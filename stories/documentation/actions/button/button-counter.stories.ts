import { Meta, StoryFn } from '@storybook/angular';

interface ButtonCounterStory {}

export default {
	title: 'Documentation/Actions/Button/Counter',
} as Meta;

function getTemplate(args: ButtonCounterStory): string {
	return `
	<button type="button" class="button mod-counter">Bouton<span class="button-counter">7</span></button>
	`;
}

const Template: StoryFn<ButtonCounterStory> = (args: ButtonCounterStory) => ({
	props: args,
	template: getTemplate(args),
});

export const CounterButton = Template.bind({});
CounterButton.args = {};
