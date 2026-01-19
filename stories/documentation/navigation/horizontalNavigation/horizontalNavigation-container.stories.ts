import { Meta, StoryObj } from '@storybook/angular';

interface HorizontalNavigationContainerStory {}

export default {
	title: 'Documentation/Navigation/HorizontalNavigation/Container',
	argTypes: {},
} as Meta;

function getTemplate(args: HorizontalNavigationContainerStory): string {
	return `<div class="horizontalNavigation">
	<div class="horizontalNavigation-containerOptional">
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
</div>`;
}

const Template = (args: HorizontalNavigationContainerStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Container: StoryObj<HorizontalNavigationContainerStory> = {
	args: {},
	render: Template,
};
