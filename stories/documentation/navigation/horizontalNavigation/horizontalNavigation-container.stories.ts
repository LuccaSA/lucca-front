import { Meta, StoryFn } from '@storybook/angular';

interface HorizontalNavigationContainerStory {}

export default {
	title: 'Documentation/Navigation/HorizontalNavigation/Container',
	argTypes: {},
} as Meta;

function getTemplate(args: HorizontalNavigationContainerStory): string {
	return `
	<nav class="horizontalNavigation">
		<div class="horizontalNavigation-containerOptionnal">
			<ul class="horizontalNavigation-list">
				<li class="horizontalNavigation-list-item">
					<a href="#" class="horizontalNavigation-list-item-action" aria-current="page">
						Page 1
					</a>
				</li>
				<li class="horizontalNavigation-list-item">
					<a href="#" class="horizontalNavigation-list-item-action">
						Page 2
					</a>
				</li>
				<li class="horizontalNavigation-list-item">
					<a href="#" class="horizontalNavigation-list-item-action">
						Page 3
					</a>
				</li>
			</ul>
		</div>
	</nav>
	`;
}

const Template: StoryFn<HorizontalNavigationContainerStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Container = Template.bind({});
Container.args = {};
