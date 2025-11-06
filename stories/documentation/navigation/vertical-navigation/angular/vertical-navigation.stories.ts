import { VerticalNavigationComponent, VerticalNavigationItemComponent, VerticalNavigationLinkDirective, VerticalNavigationListComponent } from '@lucca-front/ng/vertical-navigation';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface VerticalNavigationStories {
	title: string;
	label: string;
	disabled: boolean;
	iconless: boolean;
}

export default {
	title: 'Documentation/Navigation/VerticalNavigation/Angular/Basic',
	argTypes: {
		title: {
			control: {
				type: 'text',
			},
		},
		label: {
			control: {
				type: 'text',
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		iconless: {
			control: {
				type: 'boolean',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [VerticalNavigationComponent, VerticalNavigationLinkDirective, VerticalNavigationItemComponent, VerticalNavigationListComponent],
		}),
	],
	render: (args: VerticalNavigationStories) => {
		const label = ` label="${args.label ? args.label : ''}"`;
		const title = ` title="${args.title ? args.title : ''}"`;
		const icon = args.iconless ? '' : ` icon="heart"`;
		const disabled = args.disabled ? ` disabled` : '';
		return {
			template: cleanupTemplate(`<lu-vertical-navigation${title}>
	<lu-vertical-navigation-list${label}${icon}>
		<a *luVerticalNavigationLink href="#">Item 1</a>
		<a *luVerticalNavigationLink href="#">Item 2</a>
	</lu-vertical-navigation-list>
	<lu-vertical-navigation-item${label}${icon} />
</lu-vertical-navigation>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		title: 'Section',
		label: 'Item',
		disabled: false,
		iconless: false,
	},
};
