import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import { VerticalNavigationComponent, VerticalNavigationItemComponent, VerticalNavigationLinkDirective, VerticalNavigationListComponent } from '@lucca-front/ng/vertical-navigation';
import { Meta, moduleMetadata } from '@storybook/angular';

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
			imports: [VerticalNavigationComponent, VerticalNavigationLinkDirective, VerticalNavigationItemComponent, VerticalNavigationListComponent, LinkComponent, IconComponent],
		}),
	],
	render: (args: VerticalNavigationStories) => {
		const title = ` headingLabel="${args.title ? args.title : ''}"`;
		return {
			template: `<lu-vertical-navigation${title}>
	<ul lu-vertical-navigation-list>
		<lu-vertical-navigation-item>
			<a lu-link href="#"><lu-icon icon="heart" />Item</a>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			<a lu-link href="#">Item 2</a>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item label="Group">
			<ul lu-vertical-navigation-list>
				<lu-vertical-navigation-item>
					<a lu-link href="#">Item 3</a>
				</lu-vertical-navigation-item>
			</ul>
		</lu-vertical-navigation-item>
	</ul>
</lu-vertical-navigation>`,
		};
	},
} as Meta;
export const Basic = {
	args: {
		title: 'Section',
	},
};
