import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface PageLayoutHTMLBasicStory {}

export default {
	title: 'Documentation/Structure/Page Layout/HTML&CSS/Basic',
	argTypes: {},
	render: (args: PageLayoutHTMLBasicStory) => {
		return {
			styles: [`.pageLayout { --components-pageLayout-BlockSize: 20rem } .pageLayout-banner { height: var(--commons-banner-height) }`],
			template: cleanupTemplate(`<div class="pageLayout">
	<div class="pageLayout-banner">banner</div>
	<div class="pageLayout-navSide">navSide</div>
	<div class="pageLayout-content">content</div>
</div>
`),
		};
	},
} as Meta;

export const Basic = {};
