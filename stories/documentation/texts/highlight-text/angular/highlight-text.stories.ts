import { HighlightTextComponent } from '@lucca-front/ng/highlight-text';
import { Meta, moduleMetadata } from '@storybook/angular';
import { PaletteAllArgType } from 'stories/helpers/common-arg-types';

import { cleanupTemplate } from 'stories/helpers/stories';

interface HighlightBasicStory {}

export default {
	title: 'Documentation/Texts/Highlight Text/Angular/Basic',
	argTypes: {
		palette: PaletteAllArgType,
	},
	decorators: [
		moduleMetadata({
			imports: [HighlightTextComponent],
		}),
	],
	render: (args: HighlightBasicStory) => {
		const paletteArg = args['palette'] !== 'product' ? ` palette="${args['palette']}"` : ``;
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
