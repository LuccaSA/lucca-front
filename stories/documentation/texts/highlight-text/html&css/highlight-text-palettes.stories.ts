import { Meta, StoryObj } from '@storybook/angular-vite';

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
