import { PageLayoutComponent } from '@lucca-front/ng/page-layout';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface PageLayoutAngularStartEndStory {
	content: string;
}

export default {
	title: 'Documentation/Structure/Page Layout/Angular/StartEnd',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [PageLayoutComponent],
		}),
	],
	render: (args: PageLayoutAngularStartEndStory) => {
		return {
			styles: [
				`.story .pageLayout { block-size: 20rem } :host ::ng-deep .pageLayout-banner { background-color: var(--palettes-neutral-0) } :host ::ng-deep .pageLayout-navSide { background-color: var(--palettes-navigation-800); color: var(--palettes-neutral-0) }`,
			],
			template: cleanupTemplate(`<div class="story">
	<lu-page-layout>
		<ng-container pageLayoutStart>start</ng-container>
		<ng-container pageLayoutBanner>banner</ng-container>
		<ng-container pageLayoutNavSide>navSide</ng-container>
		<ng-container pageLayoutContent>content</ng-container>
		<ng-container pageLayoutEnd>end</ng-container>
	</lu-page-layout>
</div>`),
		};
	},
} as Meta;

export const StartEnd = { args: {} };
