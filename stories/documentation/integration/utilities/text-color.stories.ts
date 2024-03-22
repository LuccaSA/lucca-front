import { Meta, StoryFn } from '@storybook/angular';

interface TextColorStory {}

export default {
	title: 'Documentation/Integration/Utilities/TextColor',
} as Meta;

function getTemplate(args: TextColorStory): string {
	return `<span class="u-textDefault">Default</span>
<span class="u-textLight">Light</span>
<span class="u-textPlaceholder">Placeholder</span>
<span class="u-textProduct">Product</span>
<span class="u-textSuccess">Success</span>
<span class="u-textWarning">Warning</span>
<span class="u-textError">Error</span>`;
}

const Template: StoryFn<TextColorStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		span {
			padding-right: var(--pr-t-spacings-200);
		}
		}`,
	],
});

export const TextColor = Template.bind({});
TextColor.args = {};
