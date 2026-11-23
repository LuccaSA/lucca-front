import { HighlightTextComponent } from '@lucca-front/ng/highlight-text';
import { Meta, moduleMetadata } from '@storybook/angular-vite';
import { PaletteAllArgType } from '@/helpers/common-arg-types';

import { cleanupTemplate } from '@/helpers/stories';

interface HighlightBasicStory {}

export default {
	title: 'Documentation/Texts/Highlight Text/Angular/Basic',
	argTypes: {
		palette: { ...PaletteAllArgType, table: { category: 'inputs', defaultValue: { summary: 'product' } } },
	},
	decorators: [
		moduleMetadata({
			imports: [HighlightTextComponent],
		}),
	],
	render: (args: HighlightBasicStory) => {
		const palette = args['palette'];
		const paletteArg = palette && palette !== 'product' ? ` palette="${palette}"` : ``;
		return {
			template: cleanupTemplate(`<h1>Lorem <lu-highlight-text${paletteArg}>ipsum</lu-highlight-text> dolor</h1>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		palette: 'product',
	},
};
