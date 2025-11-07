import { VerticalNavigationComponent, VerticalNavigationGroupComponent, VerticalNavigationItemComponent, VerticalNavigationLinkComponent } from '@lucca-front/ng/vertical-navigation';
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
			imports: [VerticalNavigationComponent, VerticalNavigationLinkComponent, VerticalNavigationItemComponent, VerticalNavigationGroupComponent],
		}),
	],
	render: (args: VerticalNavigationStories) => {
		const title = ` headingLabel="${args.title ? args.title : ''}"`;
		return {
			template: `<lu-vertical-navigation${title}>
 	<lu-vertical-navigation-item>
		<a luVerticalNavigationLink href="#" icon="heart">Item 1</a>
	</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 2</a>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-group label="Group" icon="heart">
				<lu-vertical-navigation-item>
					<a luVerticalNavigationLink href="#">Item 3</a>
				</lu-vertical-navigation-item>
		</lu-vertical-navigation-group>
</lu-vertical-navigation>`,
		};
	},
} as Meta;
export const Basic = {
	args: {
		title: 'Section',
	},
};
