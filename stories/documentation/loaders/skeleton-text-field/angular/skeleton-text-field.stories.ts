import { SkeletonTextFieldComponent } from '@lucca-front/ng/skeleton';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton Text Field',
	component: SkeletonTextFieldComponent,
	decorators: [
		moduleMetadata({
			imports: [SkeletonTextFieldComponent],
		}),
	],
	render: (args: SkeletonTextFieldComponent) => {
		return {
			styles: [
				`
:host{
	display: flex;
	flex-direction: column;
	min-height: 30rem;
}
`,
			],
			template: `<lu-skeleton-text-field/>`,
		};
	},
} as Meta;

export const Page: StoryObj<SkeletonTextFieldComponent> = {
	args: {},
};
