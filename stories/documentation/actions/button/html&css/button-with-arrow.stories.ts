import { Meta, StoryFn } from '@storybook/angular';

interface ButtonWithArrowStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/With arrow',
} as Meta;

function getTemplate(args: ButtonWithArrowStory): string {
	return `<button aria-expanded="false" type="button" class="button mod-disclosure">Button<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom"></span></button>`;
}

const Template: StoryFn<ButtonWithArrowStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const IconWithArrowButton = Template.bind({});
IconWithArrowButton.args = {};
