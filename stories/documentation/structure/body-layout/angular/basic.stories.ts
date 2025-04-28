import { BodyLayoutComponent } from '@lucca-front/ng/body-layout';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface BodyLayoutAngularBasicStory {
	navSide: boolean;
	mobileNavSideBottom: boolean;
}

export default {
	title: 'Documentation/Structure/Body Layout/Angular/Basic',
	argTypes: {
		mobileNavSideBottom: {
			if: { arg: 'navSide', truthy: true },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [BodyLayoutComponent],
		}),
	],
	render: (args: BodyLayoutAngularBasicStory) => {
		const navSideContainer = args.navSide ? `<ng-container bodyLayoutNavSide>navSide</ng-container>` : ``;
		const mobileNavSideBottomAttribute = args.mobileNavSideBottom ? `mobileNavSideBottom` : ``;

		return {
			template: cleanupTemplate(`<lu-body-layout ${mobileNavSideBottomAttribute}>
	<ng-container bodyLayoutBanner>banner</ng-container>
	${navSideContainer}
	<ng-container bodyLayoutMain>main</ng-container>
</lu-body-layout>`),
		};
	},
} as Meta;

export const Basic = { args: { navSide: true, mobileNavSideBottom: false } };
