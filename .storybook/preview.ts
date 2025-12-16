import type { Preview } from '@storybook/angular';
import DocumentationTemplate from './DocumentationTemplate.mdx';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from './documentation.json';
import MswPlugin from './plugins/msw';

setCompodocJson(docJson);
MswPlugin.init();

const preview: Preview = {
	parameters: {
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
	},
	tags: ['autodocs'],
};

export default preview;
