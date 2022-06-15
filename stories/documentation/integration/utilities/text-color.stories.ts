import { Meta, Story } from '@storybook/angular';

interface TextColorStory {}

export default {
	title: 'Documentation/Integration/Utilities/TextColor',
} as Meta;

function getTemplate(args: TextColorStory): string {
	return `
		<span class="u-textDefault">Default</span>
		<span class="u-textLight">Light</span>
		<span class="u-textPlaceholder">Placeholder</span>
		<span class="u-textPrimary">Primary</span>
		<span class="u-textSecondary">Secondary</span>
		<span class="u-textSuccess">Success</span>
		<span class="u-textWarning">Warning</span>
		<span class="u-textError">Error</span>
	`;
}

const Template: Story<TextColorStory> = (args: TextColorStory) => ({
	props: args,
	template: getTemplate(args),
  styles: [`
		span {
			padding-right: 1rem;
		}
		}`],
});

export const TextColor = Template.bind({});
TextColor.args = { };
