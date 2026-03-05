import { Meta } from '@storybook/angular';

interface SampleBasicStory {}

export default {
	title: 'Documentation/Sample/HTML&CSS/Basic',
	argTypes: {},
	render: (args: SampleBasicStory) => {
		return {
			template: `<div class="sample">
	sample
</div>`,
		};
	},
} as Meta;

export const Basic = {};
