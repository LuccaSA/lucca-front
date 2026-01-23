import { Meta, StoryObj } from '@storybook/angular';

interface ButtonIconTextStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/With icon',
} as Meta;

function getTemplate(args: ButtonIconTextStory): string {
	return `<button type="button" class="button mod-withIcon"><span aria-hidden="true" class="lucca-icon icon-heart"></span>Button</button>`;
}

const Template = (args: ButtonIconTextStory) => ({
	props: args,
	template: getTemplate(args),
});

export const IconTextButton: StoryObj<ButtonIconTextStory> = {
	args: {},
	render: Template,
};
