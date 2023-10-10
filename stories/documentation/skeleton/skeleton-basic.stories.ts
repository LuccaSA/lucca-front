import { Meta, StoryFn } from '@storybook/angular';

interface SkeletonBasicStory {}

export default {
	title: 'Documentation/Skeleton/Basic',
} as Meta;

function getTemplate(args: SkeletonBasicStory): string {
	return `
	<div class="skeleton is-loading">
        <h2>.u-text* Skeletons</h2>
		<span class="skeleton-item u-textXXL" style="--skeleton-width: 50%;"></span>
		<span class="skeleton-item u-textXL"></span>
		<span class="skeleton-item u-textL"></span>
		<span class="skeleton-item"></span>
		<span class="skeleton-item u-textS"></span>
		<span class="skeleton-item u-textXS"></span>
        <h2>h* Skeletons</h2>
        <h1 class="skeleton-item"></h1>
        <h2 class="skeleton-item"></h2>
        <h3 class="skeleton-item"></h3>
        <h4 class="skeleton-item"></h4>
        <h5 class="skeleton-item"></h5>
        <h6 class="skeleton-item"></h6>
        <h2>.u-h* Skeletons</h2>
        <span class="u-h1 skeleton-item"></span>
        <span class="u-h2 skeleton-item"></span>
        <span class="u-h3 skeleton-item"></span>
        <span class="u-h4 skeleton-item"></span>
        <span class="u-h5 skeleton-item"></span>
        <span class="u-h6 skeleton-item"></span>
	</div>
	`;
}

const Template: StoryFn<SkeletonBasicStory> = (args: SkeletonBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
