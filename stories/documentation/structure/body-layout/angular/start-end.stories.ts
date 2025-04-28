import { BodyLayoutComponent } from '@lucca-front/ng/body-layout';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface BodyLayoutAngularStartEndStory {
	content: string;
}

export default {
	title: 'Documentation/Structure/Body Layout/Angular/StartEnd',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [BodyLayoutComponent],
		}),
	],
	render: (args: BodyLayoutAngularStartEndStory) => {
		return {
			styles: [`.bodyLayout { --components-bodyLayout-startBlockSize: 1.5rem !important; --components-bodyLayout-endBlockSize: 1.5rem !important }`],
			template: cleanupTemplate(`<lu-body-layout>
	<ng-container bodyLayoutStart>start</ng-container>
	<ng-container bodyLayoutBanner>banner</ng-container>
	<ng-container bodyLayoutNavSide>navSide</ng-container>
	<ng-container bodyLayoutMain>main</ng-container>
	<ng-container bodyLayoutEnd>end</ng-container>
</lu-body-layout>
`),
		};
	},
} as Meta;

export const StartEnd = { args: {} };
