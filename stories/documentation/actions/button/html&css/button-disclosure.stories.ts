import { Meta, StoryObj } from '@storybook/angular';

interface ButtonDisclosureStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/Disclosure',
} as Meta;

function getTemplate(args: ButtonDisclosureStory): string {
	return `<button type="button" class="button mod-disclosure">Button<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom"></span></button>`;
}

const Template = (args: ButtonDisclosureStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [],
});

export const DisclosureButton: StoryObj<ButtonDisclosureStory> = {
	args: {},
	render: Template,
};
