import { SkeletonHeaderComponent } from '@lucca-front/ng/skeleton';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton Header',
	component: SkeletonHeaderComponent,
	decorators: [
		moduleMetadata({
			imports: [SkeletonHeaderComponent],
		}),
	],
	render: (args: SkeletonHeaderComponent) => {
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
			template: `<lu-skeleton-header/>`,
		};
	},
} as Meta;

export const Page: StoryObj<SkeletonHeaderComponent> = {
	args: {},
};
