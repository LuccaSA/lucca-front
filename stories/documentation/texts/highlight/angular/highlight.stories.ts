import { HighlightComponent } from '@lucca-front/ng/highlight';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface HighlightBasicStory {}

export default {
	title: 'Documentation/Texts/Highlight/Angular/Basic',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [HighlightComponent],
		}),
	],
	render: (args: HighlightBasicStory) => {
		return {
			template: cleanupTemplate(`<h1>Lorem <lu-highlight palette="pineapple">ipsum</lu-highlight> dolor</h1>`),
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
