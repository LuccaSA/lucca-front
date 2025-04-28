import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface BodyLayoutHTMLBasicStory {}

export default {
	title: 'Documentation/Structure/Body Layout/HTML&CSS/StartEnd',
	argTypes: {},
	render: (args: BodyLayoutHTMLBasicStory) => {
		return {
			styles: [`.bodyLayout { --components-bodyLayout-startBlockSize: 1.5rem !important; --components-bodyLayout-endBlockSize: 1.5rem !important }`],
			template: cleanupTemplate(`<div class="bodyLayout">
	<div class="bodyLayout-start">start</div>
	<div class="bodyLayout-banner">banner</div>
	<div class="bodyLayout-navSide">navSide</div>
	<div class="bodyLayout-main">main</div>
	<div class="bodyLayout-end">end</div>
</div>
`),
		};
	},
} as Meta;

export const StartEnd = {};
