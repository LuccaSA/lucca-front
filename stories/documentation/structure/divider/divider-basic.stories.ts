import { Meta, Story } from '@storybook/angular';

interface DividerBasicStory {}

export default {
	title: 'Documentation/Structure/Divider/Basic',
} as Meta;

function getTemplate(args: DividerBasicStory): string {
	return `
	Lorem
	<div class="divider"></div>
	Ipsum
	<hr class="divider" />
	Dolor
	`;
}

const Template: Story<DividerBasicStory> = (args: DividerBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
