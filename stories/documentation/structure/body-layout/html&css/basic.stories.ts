import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface PageLayoutHTMLBasicStory {
	navSide: string;
	mobileNavSideBottom: boolean;
}

export default {
	title: 'Documentation/Structure/Page Layout/HTML&CSS/Basic',
	argTypes: {
		mobileNavSideBottom: {
			if: { arg: 'navSide', truthy: true },
		},
	},
	render: (args: PageLayoutHTMLBasicStory) => {
		const navSideContainer = args.navSide
			? `<div class="pageLayout-navSide" tabindex="0" id="layoutNavSide">
	navSide<br />navSide<br />navSide<br />navSide<br />navSide<br />navSide<br />navSide<br />navSide<br />navSide<br />navSide<br />
	navSide<br />navSide<br />navSide<br />navSide<br />navSide<br />navSide<br />navSide<br />navSide<br />navSide<br />navSide<br />
	navSide<br />navSide<br />navSide<br />navSide<br />navSide<br />navSide<br />navSide<br />navSide<br />navSide<br />navSide<br />
</div>`
			: ``;
		const mobileNavSideBottomAttribute = args.mobileNavSideBottom ? `mod-mobileNavSideBottom` : ``;

		return {
			styles: [
				`.pageLayout { block-size: 20rem } .pageLayout-banner { background-color: var(--palettes-neutral-0) } .pageLayout-navSide { background-color: var(--palettes-navigation-800); color: var(--palettes-neutral-0) } `,
			],
			template: cleanupTemplate(`<div class="pageLayout ${mobileNavSideBottomAttribute}">
	<div class="pageLayout-banner" tabindex="0" id="layoutBanner">banner</div>
	${navSideContainer}
	<div class="pageLayout-content" tabindex="0" id="layoutContent">
		content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />
		content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />
		content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />
		content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />
		content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />
		content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />
		content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />content<br />
	</div>
</div>
`),
		};
	},
} as Meta;

export const Basic = { args: { navSide: true, mobileNavSideBottom: false } };
