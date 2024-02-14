import { Meta, StoryFn } from '@storybook/angular';

interface MenuContainerStory {}

export default {
	title: 'Documentation/Navigation/Menu/Container',
	argTypes: {},
} as Meta;

function getTemplate(args: MenuContainerStory): string {
	return `
	<nav class="menu">
		<div class="container u-paddingTopReset u-paddingBottomReset">
			<ul class="menu-list">
				<li class="menu-list-item">
					<a href="#" class="menu-list-item-action" aria-current="page">
						Menu 1
					</a>
				</li>
				<li class="menu-list-item">
					<a href="#" class="menu-list-item-action">
						Menu 2
					</a>
				</li>
				<li class="menu-list-item">
					<a href="#" class="menu-list-item-action">
						Menu 3
					</a>
				</li>
			</ul>
		</div>
	</nav>
	`;
}

const Template: StoryFn<MenuContainerStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Container = Template.bind({});
Container.args = {};
