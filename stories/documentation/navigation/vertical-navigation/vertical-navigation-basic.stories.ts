import { Meta, StoryFn } from '@storybook/angular';

interface VerticalNavigationBasicStory {}

export default {
	title: 'Documentation/Navigation/VerticalNavigation/Basic',
} as Meta;

function getTemplate(args: VerticalNavigationBasicStory): string {
	return `<nav class="verticalNavigation">
	<h3 class="verticalNavigation-sectionTitle">Section title</h3>
	<ul class="verticalNavigation-list">
		<li class="verticalNavigation-list-item">
			<button class="verticalNavigation-list-item-link" aria-expanded="false"><span aria-hidden="true" class="verticalNavigation-list-item-link-icon lucca-icon icon-heart"></span>Item<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom verticalNavigation-list-item-link-arrow"></span></button>
			<ul class="verticalNavigation-list mod-child">
				<li class="verticalNavigation-list-item">
					<a href="#" class="verticalNavigation-list-item-link">Item</a>
				</li>
				<li class="verticalNavigation-list-item">
					<a href="#" class="verticalNavigation-list-item-link">Item</a>
				</li>
			</ul>
		</li>
		<li class="verticalNavigation-list-item">
			<button class="verticalNavigation-list-item-link" aria-expanded="true"><span aria-hidden="true" class="verticalNavigation-list-item-link-icon lucca-icon icon-heart"></span>Item<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom verticalNavigation-list-item-link-arrow"></span></button>
			<ul class="verticalNavigation-list mod-child">
				<li class="verticalNavigation-list-item">
					<a href="#" class="verticalNavigation-list-item-link" aria-current="page">Item</a>
				</li>
				<li class="verticalNavigation-list-item">
					<a href="#" class="verticalNavigation-list-item-link">Item</a>
				</li>
			</ul>
		</li>
	</ul>
</nav>`;
}

const Template: StoryFn<VerticalNavigationBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
