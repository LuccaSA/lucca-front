import { PageLayoutComponent } from '@lucca-front/ng/page-layout';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface PageLayoutAngularBasicStory {
	banner: boolean;
	navSide: boolean;
	mobileNavSideBottom: boolean;
}

export default {
	title: 'Documentation/Structure/Page Layout/Angular/Basic',
	argTypes: {
		mobileNavSideBottom: {
			if: { arg: 'navSide', truthy: true },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [PageLayoutComponent],
		}),
	],
	render: (args: PageLayoutAngularBasicStory) => {
		const bannerContainer = args.banner ? `<ng-container pageLayoutBanner>banner</ng-container>` : ``;
		const navSideContainer = args.navSide ? `<ng-container pageLayoutNavSide>navSide</ng-container>` : ``;
		const mobileNavSideBottomAttribute = args.mobileNavSideBottom ? `mobileNavSideBottom` : ``;

		return {
			styles: [
				`
:host ::ng-deep {
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
}
				`,
			],
			template: cleanupTemplate(`<lu-page-layout ${mobileNavSideBottomAttribute}>
	${bannerContainer}
	${navSideContainer}
	main
</lu-page-layout>`),
		};
	},
} as Meta;

export const Basic = { args: { banner: true, navSide: true, mobileNavSideBottom: false } };
