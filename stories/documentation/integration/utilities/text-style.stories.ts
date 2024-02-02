import { Meta, StoryFn } from '@storybook/angular';

interface TextStyleStory {}

export default {
	title: 'Documentation/Integration/Utilities/TextStyle',
} as Meta;

function getTemplate(args: TextStyleStory): string {
	return `<span class="u-fontStyleNormal">Normal</span>
<span class="u-fontStyleItalic">Italique</span><br>
<span class="u-fontWeightRegular">Regular</span>
<span class="u-fontWeightBold">Gras</span><br>
<span class="u-textDecorationNone">Aucun</span>
<span class="u-textDecorationUnderline">Souligné</span>
<span class="u-textDecorationLineThrough">Barré</span>`;
}

const Template: StoryFn<TextStyleStory> = (args: TextStyleStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		span {
			padding-right: var(--spacings-S);
		}
		}`,
	],
});

export const TextStyle = Template.bind({});
TextStyle.args = {};
