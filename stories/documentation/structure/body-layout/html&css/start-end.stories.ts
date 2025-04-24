import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface PageLayoutHTMLBasicStory {}

export default {
	title: 'Documentation/Structure/Page Layout/HTML&CSS/StartEnd',
	argTypes: {},
	render: (args: PageLayoutHTMLBasicStory) => {
		return {
			styles: [
				`.story .pageLayout { block-size: 20rem } .pageLayout-banner { background-color: var(--palettes-neutral-0) } .pageLayout-navSide { background-color: var(--palettes-navigation-800); color: var(--palettes-neutral-0) } `,
			],
			template: cleanupTemplate(`<!-- .pageLayout is actually placed on the body -->
<div class="story">
	<div class="pageLayout">
		<div class="pageLayout-start">start</div>
		<div class="pageLayout-banner" tabindex="-1" id="layoutBanner">banner</div>
		<div class="pageLayout-navSide" tabindex="-1" id="layoutNavSide">navSide</div>
		<div class="pageLayout-content" tabindex="-1" id="layoutContent">content</div>
		<div class="pageLayout-end">end</div>
	</div>
</div>
`),
		};
	},
} as Meta;

export const StartEnd = {};
