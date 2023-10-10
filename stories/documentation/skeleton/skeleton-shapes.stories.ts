import { Meta, StoryFn } from '@storybook/angular';

interface SkeletonShapesStory {}

export default {
	title: 'Documentation/Skeleton/Shapes',
} as Meta;

function getTemplate(args: SkeletonShapesStory): string {
	return `
	<div class="skeleton is-loading">
        <h2>Square Skeletons</h2>
        <div class="u-displayFlex u-gapXS u-alignItemsCenter">
            <span class="skeleton-item mod-square mod-XS"></span>
            <span class="skeleton-item mod-square mod-S"></span>
            <span class="skeleton-item mod-square"></span>
            <span class="skeleton-item mod-square mod-L"></span>
            <span class="skeleton-item mod-square mod-XL"></span>
            <span class="skeleton-item mod-square mod-XXL"></span>
        </div>
        <h2>Circle Skeletons</h2>
        <div class="u-displayFlex u-gapXS u-alignItemsCenter">
            <span class="skeleton-item mod-circle mod-XS"></span>
            <span class="skeleton-item mod-circle mod-S"></span>
            <span class="skeleton-item mod-circle"></span>
            <span class="skeleton-item mod-circle mod-L"></span>
            <span class="skeleton-item mod-circle mod-XL"></span>
            <span class="skeleton-item mod-circle mod-XXL"></span>
        </div>
	</div>
	`;
}

const Template: StoryFn<SkeletonShapesStory> = (args: SkeletonShapesStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
