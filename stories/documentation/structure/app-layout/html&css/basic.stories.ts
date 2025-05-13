import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface AppLayoutHTMLBasicStory {
	banner: boolean;
	navSide: boolean;
	mobileNavSideBottom: boolean;
	mainWithScroll: boolean;
	navSideWithScroll: boolean;
}

export default {
	title: 'Documentation/Structure/App Layout/HTML&CSS/Basic',
	argTypes: {
		mobileNavSideBottom: {
			if: { arg: 'navSide', truthy: true },
		},
		navSideWithScroll: {
			if: { arg: 'navSide', truthy: true },
		},
	},
	render: (args: AppLayoutHTMLBasicStory) => {
		const img = `<img src="https://dummyimage.com/200x1000" class="u-displayBlock u-alignSelfFlexStart" alt="" />`;
		const mainImg = args.mainWithScroll ? img : ``;
		const navSideImg = args.navSideWithScroll ? img : ``;
		const bannerContainer = args.banner ? `<div class="appLayout-banner">banner</div>` : ``;
		const navSideContainer = args.navSide ? `<div class="appLayout-navSide">navSide${navSideImg}</div>` : ``;
		const mobileNavSideBottomAttribute = args.mobileNavSideBottom ? `mod-mobileNavSideBottom` : ``;

		return {
			styles: [
				`
.appLayout {
	block-size: 25rem;
	border: 1px dashed;
	box-sizing: content-box;
}
.appLayout-banner {
	background-color: var(--palettes-neutral-0)
}
.appLayout-navSide {
	background-color: var(--palettes-navigation-800);
	color: var(--palettes-neutral-0)
}
				`,
			],
			template: cleanupTemplate(`
<div class="appLayout ${mobileNavSideBottomAttribute}">
	${bannerContainer}
	${navSideContainer}
	<div class="appLayout-main">
    main${mainImg}
	</div>
</div>
`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		banner: true,
		navSide: true,
		mobileNavSideBottom: false,
		navSideWithScroll: false,
		mainWithScroll: false,
	},
};
