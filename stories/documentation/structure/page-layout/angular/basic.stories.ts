import { PageLayoutComponent } from '@lucca-front/ng/page-layout';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface PageLayoutAngularBasicStory {
	content: string;
}

export default {
	title: 'Documentation/Structure/Page Layout/Angular/Basic',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [PageLayoutComponent],
		}),
	],
	render: (args: PageLayoutAngularBasicStory) => {
		return {
			styles: [`.pageLayout { --components-pageLayout-BlockSize: 20rem } :host ::ng-deep .pageLayout-banner { height: var(--commons-banner-height) }`],
			template: cleanupTemplate(`<lu-page-layout class="pageLayout">
	<ng-container pageLayoutBanner>banner</ng-container>
	<ng-container pageLayoutNavSide>navSide</ng-container>
	<ng-container pageLayoutContent>content</ng-container>
</lu-page-layout>`),
		};
	},
} as Meta;

export const Basic = { args: {} };
