import { Meta, Story } from '@storybook/angular';

interface VerticalNavigationBasicStory {
	disabled: boolean;
}

export default {
	title: 'Documentation/Navigation/VerticalNavigation/Basic',
	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: VerticalNavigationBasicStory): string {
	const disabled = args.disabled ? ` is-disabled` : '';
	const disabledTabIndex = args.disabled ? ` tabindex="-1"` : '';
	return `<nav class="verticalNavigation">
	<h3 class="verticalNavigation-sectionTitle">Section title</h3>
	<ul class="verticalNavigation-list">
		<li class="verticalNavigation-list-item">
			<button class="verticalNavigation-list-item-link" aria-expanded="false"><span aria-hidden="true" class="verticalNavigation-list-item-link-icon lucca-icon icon-heart"></span>Item<span aria-hidden="true" class="lucca-icon icon-southArrow verticalNavigation-list-item-link-arrow"></span></button>
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
			<button class="verticalNavigation-list-item-link" aria-expanded="true"><span aria-hidden="true" class="verticalNavigation-list-item-link-icon lucca-icon icon-heart"></span>Item<span aria-hidden="true" class="lucca-icon icon-southArrow verticalNavigation-list-item-link-arrow"></span></button>
			<ul class="verticalNavigation-list mod-child">
				<li class="verticalNavigation-list-item">
					<a href="#" class="verticalNavigation-list-item-link${disabled}"${disabledTabIndex}>Item</a>
				</li>
				<li class="verticalNavigation-list-item">
					<a href="#" class="verticalNavigation-list-item-link" aria-current="page">Item</a>
				</li>
			</ul>
		</li>
	</ul>
	<h3 class="verticalNavigation-sectionTitle">Section title</h3>
	<ul class="verticalNavigation-list">
		<li class="verticalNavigation-list-item">
			<a href="#" class="verticalNavigation-list-item-link${disabled}">Item</a>
		</li>
		<li class="verticalNavigation-list-item">
			<a href="#" class="verticalNavigation-list-item-link">Item</a>
		</li>
	</ul>
</nav>`;
}

const Template: Story<VerticalNavigationBasicStory> = (args: VerticalNavigationBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { disabled: false };
