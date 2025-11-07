import { VerticalNavigationComponent, VerticalNavigationItemComponent, VerticalNavigationLinkDirective, VerticalNavigationListComponent } from '@lucca-front/ng/vertical-navigation';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface VerticalNavigationStories {
	title: string;
}

export default {
	title: 'Documentation/Navigation/VerticalNavigation/Angular/Basic',
	argTypes: {
		title: {
			control: {
				type: 'text',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [VerticalNavigationComponent, VerticalNavigationLinkDirective, VerticalNavigationItemComponent, VerticalNavigationListComponent],
		}),
	],
	render: (args: VerticalNavigationStories) => {
		const title = ` title="${args.title ? args.title : ''}"`;
		return {
			template: cleanupTemplate(`<lu-vertical-navigation${title}>
	<lu-vertical-navigation-list icon="heart" label="Item Group 1">
		<a *luVerticalNavigationLink href="#" aria-current="page">Item 1</a>
		<a *luVerticalNavigationLink href="#">Item 2</a>
	</lu-vertical-navigation-list>
	<lu-vertical-navigation-item icon="heartFilled" label="Item 1" />
	<lu-vertical-navigation-list icon="star" label="Item Group 2">
		<a *luVerticalNavigationLink href="#">Item 1</a>
		<a *luVerticalNavigationLink href="#">Item 2</a>
		<a *luVerticalNavigationLink href="#">Item 3</a>
	</lu-vertical-navigation-list>
	<lu-vertical-navigation-item icon="starFilled" label="Item 2" />
</lu-vertical-navigation>`),
		};
	},
} as Meta;
export const Basic = {
	args: {
		title: 'Section',
	},
};
