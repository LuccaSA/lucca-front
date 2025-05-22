import { Meta, moduleMetadata } from '@storybook/angular';
import { AppLayoutComponent } from 'packages/ng/app-layout/app-layout.component';
import { cleanupTemplate } from 'stories/helpers/stories';

interface AppLayoutAngularBasicStory {
	banner: boolean;
	navSide: boolean;
	mobileNavSideBottom: boolean;
	mainWithScroll: boolean;
	navSideWithScroll: boolean;
}

export default {
	title: 'Documentation/Structure/App Layout/Angular/Basic',
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
			imports: [AppLayoutComponent],
		}),
	],
	render: (args: AppLayoutAngularBasicStory) => {
		const bannerContainer = args.banner ? `<ng-container appLayoutBanner>banner</ng-container>` : ``;
		const mobileNavSideBottomAttribute = args.mobileNavSideBottom ? `mobileNavSideBottom` : ``;
		const img = `<img src="https://dummyimage.com/200x1000" class="u-displayBlock" alt="" />`;
		const mainImg = args.mainWithScroll ? img : ``;
		const navSideImg = args.navSideWithScroll ? img : ``;
		const navSideContainer = args.navSide ? `<ng-container appLayoutNavSide>navSide${navSideImg}</ng-container>` : ``;

		return {
			styles: [
				`
:host ::ng-deep {
	.appLayout {
		--components-appLayout-minBlockSize: 25rem;
		block-size: var(--components-appLayout-minBlockSize);
		overflow: auto;
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
}
				`,
			],
			template: cleanupTemplate(`<lu-app-layout ${mobileNavSideBottomAttribute}>
	${bannerContainer}
	${navSideContainer}
	main
	${mainImg}
</lu-app-layout>`),
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
