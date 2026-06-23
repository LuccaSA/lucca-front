import { Meta, moduleMetadata } from '@storybook/angular-vite';
import { cleanupTemplate } from '@/helpers/stories';

interface SampleBasicStory {
	content: string;
}

export default {
	title: 'Documentation/Sample/Angular/Basic',
	argTypes: {
		content: {
			control: {
				type: 'text',
			},
		},
	},
	decorators: [
		moduleMetadata({
			// imports: [SampleComponent],
		}),
	],
	render: (args: SampleBasicStory) => {
		return {
			template: cleanupTemplate(`<luSample>
	${args.content}
</luSample>`),
		};
	},
} as Meta;

export const Basic = { args: { content: 'Sample' } };
