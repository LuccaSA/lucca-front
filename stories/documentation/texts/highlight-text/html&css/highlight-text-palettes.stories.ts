import { DECORATIVE_PALETTE, PALETTE } from '@lucca/prisme/core';
import { Meta, StoryObj } from '@storybook/angular-vite';
import { setStoryOptions } from '@/helpers/stories';
import { HIGHLIGHT_DATA_PALETTE } from '@lucca-front/ng/highlight-data';

interface TextHighlightStory {
	palette: string;
}



export default {
	title: 'Documentation/Texts/Highlight Text/HTML&CSS/Palettes',
} as Meta;

function getTemplate(): string {
	return HIGHLIGHT_DATA_PALETTE.map((palette) => `<p>Lorem <strong class="highlightText palette-${palette}">ipsum</strong> dolor</p>`).join('\n');
}

const Template = () => ({
	template: getTemplate(),
});

export const Basic: StoryObj = {
	render: Template,
};
