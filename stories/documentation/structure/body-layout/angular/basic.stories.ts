import { PageLayoutComponent } from '@lucca-front/ng/page-layout';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface PageLayoutAngularBasicStory {
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
		const navSideContainer = args.navSide ? `<ng-container pageLayoutNavSide>navSide</ng-container>` : ``;
		const mobileNavSideBottomAttribute = args.mobileNavSideBottom ? `mobileNavSideBottom` : ``;

		return {
			styles: [
				`.pageLayout { block-size: 20rem } :host ::ng-deep .pageLayout-banner { background-color: var(--palettes-neutral-0) } :host ::ng-deep .pageLayout-navSide { background-color: var(--palettes-navigation-800); color: var(--palettes-neutral-0) }`,
			],
			template: cleanupTemplate(`<lu-page-layout ${mobileNavSideBottomAttribute}>
	<ng-container pageLayoutBanner>banner</ng-container>
	${navSideContainer}
	<ng-container pageLayoutContent>content</ng-container>
</lu-page-layout>`),
		};
	},
} as Meta;

export const Basic = { args: { navSide: true, mobileNavSideBottom: false } };
