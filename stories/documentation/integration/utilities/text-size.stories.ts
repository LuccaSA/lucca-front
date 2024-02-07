import { Meta, StoryFn } from '@storybook/angular';

interface TextSizeStory {}

export default {
	title: 'Documentation/Integration/Utilities/TextSize',
} as Meta;

function getTemplate(args: TextSizeStory): string {
	return `
		<span class="u-textXS">XS</span>
		<span class="u-textS">S</span>
		<span class="u-textM">M</span>
		<span class="u-textL">L</span>
		<span class="u-textXL">XL</span>
		<span class="u-textXXL">XXL</span>
	`;
}

const Template: StoryFn<TextSizeStory> = (args: TextSizeStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		span {
			padding-right: var(--pr-t-spacings-M);
		}
		}`,
	],
});

export const TextSize = Template.bind({});
TextSize.args = {};
