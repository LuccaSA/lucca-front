import { VerticalNavigationComponent, VerticalNavigationGroupComponent, VerticalNavigationItemComponent, VerticalNavigationLinkComponent } from '@lucca-front/ng/vertical-navigation';
import { Meta, moduleMetadata } from '@storybook/angular';

interface VerticalNavigationIconlessStory {
	iconless: boolean;
}

export default {
	title: 'Documentation/Navigation/VerticalNavigation/Angular/Iconless',
	argTypes: {
		iconless: {
			control: {
				type: 'boolean',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [VerticalNavigationComponent, VerticalNavigationLinkComponent, VerticalNavigationItemComponent, VerticalNavigationGroupComponent],
		}),
	],
	render: (args: VerticalNavigationIconlessStory) => {
		const icon = args.iconless ? '' : ` icon="heart"`;
		return {
			template: `<lu-vertical-navigation headingLabel="Section">
	<lu-vertical-navigation-item>
		<a luVerticalNavigationLink href="#"${icon}>Item 1</a>
	</lu-vertical-navigation-item>
	<lu-vertical-navigation-group label="Group"${icon}>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 2</a>
			<a luVerticalNavigationLink href="#">Item 3</a>
		</lu-vertical-navigation-item>
	</lu-vertical-navigation-group>`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		iconless: true,
	},
};
