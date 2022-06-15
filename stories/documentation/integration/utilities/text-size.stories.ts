import { Meta, Story } from '@storybook/angular';

interface TextSizeStory {}

export default {
	title: 'Documentation/Integration/Utilities/TextSize',
} as Meta;

function getTemplate(args: TextSizeStory): string {
	return `
		<span class="u-textSmaller">Smaller</span>
		<span class="u-textSmall">Small</span>
		<span class="u-textStandard">Standard</span>
		<span class="u-textBig">Big</span>
		<span class="u-textBigger">Bigger</span>
		<span class="u-textBiggest">Biggest</span>
	`;
}

const Template: Story<TextSizeStory> = (args: TextSizeStory) => ({
	props: args,
	template: getTemplate(args),
  styles: [`
		span {
			padding-right: 1rem;
		}
		}`],
});

export const TextSize = Template.bind({});
TextSize.args = { };
