import { Meta, StoryObj } from '@storybook/angular';

interface IconBasicStory {}

export default {
	title: 'Documentation/Texts/Icons/HTML&CSS',
} as Meta;

function getTemplate(args: IconBasicStory): string {
	return `<span aria-hidden="true" class="lucca-icon icon-heart">`;
}

const Template = (args: IconBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<IconBasicStory> = {
	args: {},
	render: Template,
};
