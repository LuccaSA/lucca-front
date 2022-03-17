import { Meta, Story } from '@storybook/angular';

interface MenuContainerStory {
}

export default {
	title: 'Documentation/Navigation/Menu/Container',
	argTypes: {
	},
} as Meta;

function getTemplate(args: MenuContainerStory): string {
	return `
	<nav class="menu">
		<div class="container u-paddingTopReset u-paddingBottomReset">
			<ul class="menu-list">
				<li class="menu-list-item">
					<a href="#" class="menu-list-item-action" aria-current="page">
						Menu 1
						<span class="menu-list-item-action-placeholder" aria-hidden="true" data-content-after="Menu 1"></span>
					</a>
				</li>
				<li class="menu-list-item">
					<a href="#" class="menu-list-item-action">
						Menu 2
						<span class="menu-list-item-action-placeholder" aria-hidden="true" data-content-after="Menu 2"></span>
					</a>
				</li>
				<li class="menu-list-item">
					<a href="#" class="menu-list-item-action">
						Menu 3
						<span class="menu-list-item-action-placeholder" aria-hidden="true" data-content-after="Menu 3"></span>
					</a>
				</li>
			</ul>
		</div>
	</nav>
	`
}

const Template: Story<MenuContainerStory> = (args: MenuContainerStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Container = Template.bind({});
Container.args = { };
