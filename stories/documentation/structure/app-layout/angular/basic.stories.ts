import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface AppLayoutAngularBasicStory {
	banner: boolean;
	navSide: boolean;
	mobileNavSideBottom: boolean;
}

export default {
	title: 'Documentation/Structure/App Layout/Angular/Basic',
	argTypes: {
		mobileNavSideBottom: {
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
		const navSideContainer = args.navSide ? `<ng-container appLayoutNavSide>navSide</ng-container>` : ``;
		const mobileNavSideBottomAttribute = args.mobileNavSideBottom ? `mobileNavSideBottom` : ``;

		return {
			styles: [
				`
:host ::ng-deep {
	.appLayout {
		block-size: 25rem;
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
</lu-app-layout>`),
		};
	},
} as Meta;

export const Basic = { args: { banner: true, navSide: true, mobileNavSideBottom: false } };
