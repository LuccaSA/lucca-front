import { VerticalNavigationComponent, VerticalNavigationGroupComponent, VerticalNavigationItemComponent, VerticalNavigationLinkComponent } from '@lucca-front/ng/vertical-navigation';
import { Meta, moduleMetadata } from '@storybook/angular';

interface VerticalNavigationStories {
	heading: string;
}

export default {
	title: 'Documentation/Navigation/VerticalNavigation/Angular/Basic',
	argTypes: {
		heading: {
			control: {
				type: 'text',
			},
			description: 'Titre de la section.',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [VerticalNavigationComponent, VerticalNavigationLinkComponent, VerticalNavigationItemComponent, VerticalNavigationGroupComponent],
		}),
	],
	render: (args: VerticalNavigationStories) => {
		const heading = ` heading="${args.heading ? args.heading : ''}"`;
		return {
			template: `<lu-vertical-navigation${heading}>
	<lu-vertical-navigation-group label="Group 1" icon="heart">
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 1</a>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#" aria-current="page">Item 2</a>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 3</a>
		</lu-vertical-navigation-item>
	</lu-vertical-navigation-group>
 	<lu-vertical-navigation-item>
		<a luVerticalNavigationLink href="#" icon="heartFilled">Item 4</a>
	</lu-vertical-navigation-item>
</lu-vertical-navigation>`,
		};
	},
} as Meta;
export const Basic = {
	args: {
		heading: 'Section',
	},
};
