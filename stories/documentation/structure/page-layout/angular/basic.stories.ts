import { BodyLayoutComponent } from '@lucca-front/ng/body-layout';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface BodyLayoutAngularBasicStory {
	banner: boolean;
	navSide: boolean;
	mobileNavSideBottom: boolean;
	mainWithScroll: boolean;
	navSideWithScroll: boolean;
}

export default {
	title: 'Documentation/Structure/Body Layout/Angular/Basic',
	argTypes: {
		mobileNavSideBottom: {
			if: { arg: 'navSide', truthy: true },
		},
		navSideWithScroll: {
			if: { arg: 'navSide', truthy: true },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [BodyLayoutComponent],
		}),
	],
	render: (args: BodyLayoutAngularBasicStory) => {
		const bannerContainer = args.banner ? `<ng-container bodyLayoutBanner>banner</ng-container>` : ``;
		const mobileNavSideBottomAttribute = args.mobileNavSideBottom ? `mobileNavSideBottom` : ``;
		const img = `<img src="https://dummyimage.com/200x1000" class="u-displayBlock" alt="" />`;
		const mainImg = args.mainWithScroll ? img : ``;
		const navSideImg = args.navSideWithScroll ? img : ``;
		const navSideContainer = args.navSide ? `<ng-container bodyLayoutNavSide>navSide${navSideImg}</ng-container>` : ``;

		return {
			styles: [
				`
:host ::ng-deep {
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
}
				`,
			],
			template: cleanupTemplate(`<lu-body-layout ${mobileNavSideBottomAttribute}>
	${bannerContainer}
	${navSideContainer}
	main
	${mainImg}
</lu-body-layout>`),
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
