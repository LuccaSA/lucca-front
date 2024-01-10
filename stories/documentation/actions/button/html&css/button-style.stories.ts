import { Meta, StoryFn } from '@storybook/angular';

interface ButtonStyleStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/Style',
	argTypes: {},
} as Meta;

function getTemplate(args: ButtonStyleStory): string {
	return `<button type="button" class="button">Button</button>
<button type="button" class="button mod-outlined">Button</button>
<button type="button" class="button mod-text">Button</button>`;
}

const Template: StoryFn<ButtonStyleStory> = (args: ButtonStyleStory) => ({
	props: args,
	template: getTemplate(args),
});

export const StyleButton = Template.bind({});
StyleButton.args = {};