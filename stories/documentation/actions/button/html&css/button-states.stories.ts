import { Meta, StoryFn } from '@storybook/angular';

interface ButtonStatesStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/States',
} as Meta;

function getTemplate(args: ButtonStatesStory): string {
	return `<button type="button" class="button is-loading">Button</button>
<button type="button" class="button is-success">Button</button>
<button type="button" class="button is-error">Button</button>`;
}


const Template: StoryFn<ButtonStatesStory> = (args: ButtonStatesStory) => ({
	props: args,
	template: getTemplate(args),
});

export const StatesButton = Template.bind({});
StatesButton.args = {};
