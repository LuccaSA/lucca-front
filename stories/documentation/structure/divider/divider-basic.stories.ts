import { Meta, StoryFn } from '@storybook/angular';

interface DividerBasicStory {}

export default {
	title: 'Documentation/Structure/Divider/Basic',
} as Meta;

function getTemplate(args: DividerBasicStory): string {
	return `
	Divider
	<hr class="divider" />
	Decorative divider
	<div class="divider"></div>
	Divider with content
	<div class="divider">Text</div>
	Divider with small content
	<div class="divider mod-S">Text</div>
	Divider with button
	<div class="divider"><button class="button" type="button">Button</button></div>
	Divider with small button
	<div class="divider mod-S"><button class="button" type="button">Button</button></div>
	Divider with Icon
	<div class="divider"><span aria-hidden="true" class="lucca-icon icon-heart"></span></div>
	Divider with small Icon
	<div class="divider mod-S"><span aria-hidden="true" class="lucca-icon icon-heart"></span></div>
	`;
}

const Template: StoryFn<DividerBasicStory> = (args: DividerBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
