import { DECORATIVE_PALETTE, PALETTE } from '@lucca/prisme/core';
import { Meta, StoryObj } from '@storybook/angular';
import { setStoryOptions } from '@/helpers/stories';

interface TextHighlightStory {
	palette: string;
}

export default {
	title: 'Documentation/Texts/Highlight Text/HTML&CSS/Palettes',
	argTypes: {
		palette: {
			options: setStoryOptions([...PALETTE, ...DECORATIVE_PALETTE]),
			control: {
				type: 'select',
			},
			description: 'Applique une palette de couleurs au highlight text.',
		},
	},
} as Meta;

function getTemplate(args: TextHighlightStory): string {
	const { palette, ...inputs } = args;
	const paletteArg = palette !== 'none' && palette !== undefined && palette !== '' ? ` palette-${palette}` : ``;
	return `<h1>Lorem <strong class="highlightText${paletteArg}">ipsum</strong> dolor</h1>`;
}

const Template = (args: TextHighlightStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<TextHighlightStory> = {
	args: {
		palette: 'none',
	},
	render: Template,
};
