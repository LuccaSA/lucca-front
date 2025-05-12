import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface BodyLayoutHTMLBasicStory {
	banner: boolean;
	navSide: boolean;
	mobileNavSideBottom: boolean;
	mainWithScroll: boolean;
	navSideWithScroll: boolean;
}

export default {
	title: 'Documentation/Structure/Body Layout/HTML&CSS/Basic',
	argTypes: {
		mobileNavSideBottom: {
			if: { arg: 'navSide', truthy: true },
		},
		navSideWithScroll: {
			if: { arg: 'navSide', truthy: true },
		},
	},
	render: (args: BodyLayoutHTMLBasicStory) => {
		const bannerContainer = args.banner ? `<div class="bodyLayout-banner">banner</div>` : ``;
		const mobileNavSideBottomAttribute = args.mobileNavSideBottom ? `mod-mobileNavSideBottom` : ``;
		const img = `<img src="https://dummyimage.com/200x1000" class="u-displayBlock" alt="" />`;
		const mainImg = args.mainWithScroll ? img : ``;
		const navSideImg = args.navSideWithScroll ? img : ``;
		const navSideContainer = args.navSide ? `<div class="bodyLayout-navSide">navSide${navSideImg}</div>` : ``;

		return {
			styles: [
				`
.bodyLayout {
	--components-bodyLayout-minBlockSize: 25rem;
	block-size: var(--components-bodyLayout-minBlockSize);
	overflow: auto;
	border: 1px dashed;
	box-sizing: content-box;
}
.bodyLayout-banner {
	background-color: var(--palettes-neutral-0)
}
.bodyLayout-navSide {
	background-color: var(--palettes-navigation-800);
	color: var(--palettes-neutral-0)
}
				`,
			],
			template: cleanupTemplate(`
<div class="bodyLayout ${mobileNavSideBottomAttribute}">
	${bannerContainer}
	${navSideContainer}
	<div class="bodyLayout-main">
    main
		${mainImg}
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
