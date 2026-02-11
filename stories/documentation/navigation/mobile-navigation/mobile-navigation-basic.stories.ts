import { Meta, StoryObj } from '@storybook/angular';

interface MobileNavigationBasicStory {}

export default {
	title: 'Documentation/Navigation/MobileNavigation/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: MobileNavigationBasicStory): string {
	return `<nav class="mobileNavigation">
	<ul class="mobileNavigation-list">
		<li class="mobileNavigation-list-item">
			<a href="#" class="mobileNavigation-list-item-link" aria-current="page">
				<span aria-hidden="true" class="lucca-icon icon-heart"></span>
				Label
			</a>
		</li>
		<li class="mobileNavigation-list-item">
			<a href="#" class="mobileNavigation-list-item-link">
				<span aria-hidden="true" class="lucca-icon icon-heart"></span>
				Label
			</a>
		</li>
		<li class="mobileNavigation-list-item">
			<a href="#" class="mobileNavigation-list-item-link">
				<span aria-hidden="true" class="lucca-icon icon-heart"></span>
				Label
				<span class="mobileNavigation-list-item-link-counter numericBadge mod-XS">2</span>
			</a>
		</li>
		<li class="mobileNavigation-list-item">
			<a href="#" class="mobileNavigation-list-item-link">
				<span aria-hidden="true" class="lucca-icon icon-heart"></span>
				Label
			</a>
		</li>
	</ul>
</nav>`;
}

const Template = (args: MobileNavigationBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<MobileNavigationBasicStory> = {
	args: {},
	render: Template,
};
