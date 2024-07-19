import DocumentationTemplate from './DocumentationTemplate.mdx';
import CompodocPlugin from './plugins/compodoc.mjs';
import LocaleIdPlugin from './plugins/locale-id.mjs';
import MswPlugin from './plugins/msw.mjs';

LocaleIdPlugin.init();
CompodocPlugin.init();
MswPlugin.init();

export const parameters = {
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	docs: {
		// When stories are rendered inside an iframe, controls no longer affect displayed story
		inlineStories: true,
		page: DocumentationTemplate,
		canvas: {
			sourceState: 'shown',
		},
	},
	backgrounds: {
		default: 'Default',
		values: [
			{
				name: 'Raised',
				value: '#ffffff',
			},
			{
				name: 'Default',
				value: '#f3f6fc',
			},
			{
				name: 'Sunken',
				value: '#e7edf9',
			},
			{
				name: 'Inverted',
				value: '#0b1732',
			},
		],
	},
};

export const decorators = [LocaleIdPlugin.decorator];
