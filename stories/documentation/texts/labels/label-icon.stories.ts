import { Meta, StoryObj } from '@storybook/angular';

interface LabelIconStory {}

export default {
	title: 'Documentation/Texts/Label/Icon',
	argTypes: {},
} as Meta;

function getTemplate(args: LabelIconStory): string {
	return `<span class="label"><span aria-hidden="true" class="label-icon lucca-icon icon-signInfo"></span>Label</span>`;
}

const Template = (args: LabelIconStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Icon: StoryObj<LabelIconStory> = {
	args: {},
	render: Template,
};
