import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface SampleBasicStory {}

export default {
	title: 'Documentation/Sample/HTML&CSS/Basic',
	argTypes: {},
	render: (args: SampleBasicStory) => {
		return {
			template: cleanupTemplate(`

	<div class="sample  ">
		sample

		</div>

`),
		};
	},
} as Meta;

export const Basic = {};
