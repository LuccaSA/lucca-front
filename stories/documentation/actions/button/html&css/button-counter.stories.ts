import { Meta, StoryFn } from '@storybook/angular';

interface ButtonCounterStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/Counter',
} as Meta;

function getTemplate(args: ButtonCounterStory): string {
	return `<button type="button" class="button">Button<span class="numericBadge">7</span></button>`;
}

const Template: StoryFn<ButtonCounterStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const CounterButton = Template.bind({});
CounterButton.args = {};
