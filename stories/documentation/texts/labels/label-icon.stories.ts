import { Meta, Story } from '@storybook/angular';

interface LabelIconStory {}

export default {
	title: 'Documentation/Texts/Label/Icon',
	argTypes: {},
} as Meta;

function getTemplate(args: LabelIconStory): string {
	return `
		<span class="label mod-icon"><span aria-hidden="true" class="lucca-icon icon-info label-icon"></span>Label</span>
	`;
}

const Template: Story<LabelIconStory> = (args: LabelIconStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Icon = Template.bind({});
Icon.args = { };
