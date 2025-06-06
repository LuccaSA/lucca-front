import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface AppLayoutAngularBasicStory {
	mobileNavSideBottom: boolean;
}

export default {
	title: 'Documentation/Structure/App Layout/Angular/Basic',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [AppLayoutComponent],
		}),
	],
	render: (args: AppLayoutAngularBasicStory) => {
		const mobileNavSideBottomAttribute = args.mobileNavSideBottom ? `mobileNavSideBottom` : ``;

		return {
			styles: [
				`
:host ::ng-deep {
	.appLayout {
		--components-appLayout-blockSize: 27rem;
		--components-appLayout-inlineSize: 48rem;
		resize: both;
		overflow: hidden;
	}
	.appLayout-banner {
		background-color: var(--palettes-neutral-0);
		border-radius: var(--commons-borderRadius-L);
	}
	.appLayout-navSide {
		background-color: var(--palettes-navigation-800);
		color: var(--palettes-neutral-0);
		border-radius: var(--commons-borderRadius-L);
	}
}
`,
			],
			template: cleanupTemplate(
				`
<lu-app-layout ${mobileNavSideBottomAttribute}>
	<ng-container appLayoutBanner>banner</ng-container>
	<ng-container appLayoutNavSide>navSide</ng-container>
	<ng-container appLayoutMain>main</ng-container>
</lu-app-layout>
`,
			),
		};
	},
} as Meta;

export const Basic = {
	args: {
		mobileNavSideBottom: false,
	},
};
