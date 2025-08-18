import { Meta, StoryFn } from '@storybook/angular';

interface ButtonSizeStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/Size',
	argTypes: {},
} as Meta;

function getTemplate(args: ButtonSizeStory): string {
	return `<div class="pr-u-displayFlex pr-u-gap100 pr-u-alignItemsCenter">
	<button type="button" class="button">Button</button>
	<button type="button" class="button mod-S">Button</button>
	<button type="button" class="button mod-XS">Button</button>
</div>`;
}

const Template: StoryFn<ButtonSizeStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const SizeButton = Template.bind({});
SizeButton.args = {};
