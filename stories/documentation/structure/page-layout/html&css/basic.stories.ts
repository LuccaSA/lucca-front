import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface PageLayoutHTMLBasicStory {
	banner: boolean;
	navSide: boolean;
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
		const bannerContainer = args.banner ? `<div class="pageLayout-banner">banner</div>` : ``;
		const navSideContainer = args.navSide ? `<div class="pageLayout-navSide">navSide</div>` : ``;
		const mobileNavSideBottomAttribute = args.mobileNavSideBottom ? `mod-mobileNavSideBottom` : ``;

		return {
			styles: [
				`
.pageLayout {
	block-size: 25rem;
}
.pageLayout-banner {
	background-color: var(--palettes-neutral-0)
}
.pageLayout-navSide {
	background-color: var(--palettes-navigation-800);
	color: var(--palettes-neutral-0)
}
				`,
			],
			template: cleanupTemplate(`
<div class="pageLayout ${mobileNavSideBottomAttribute}">
	${bannerContainer}
	${navSideContainer}
	<div class="pageLayout-main">
    main
	</div>
</div>
`),
		};
	},
} as Meta;

export const Basic = { args: { banner: true, navSide: true, mobileNavSideBottom: false } };
