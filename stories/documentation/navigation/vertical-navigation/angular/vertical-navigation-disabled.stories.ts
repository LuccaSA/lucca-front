import { VerticalNavigationComponent, VerticalNavigationGroupComponent, VerticalNavigationItemComponent, VerticalNavigationLinkComponent } from '@lucca-front/ng/vertical-navigation';
import { Meta, moduleMetadata } from '@storybook/angular';

interface VerticalNavigationDisabledStories {
	disabled: boolean;
}

export default {
	title: 'Documentation/Navigation/VerticalNavigation/Angular/Disabled',
	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
			description: 'Désactive le composant.',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [VerticalNavigationComponent, VerticalNavigationLinkComponent, VerticalNavigationItemComponent, VerticalNavigationGroupComponent],
		}),
	],
	render: (args: VerticalNavigationDisabledStories) => {
		const disabledItem = args.disabled ? `<span luVerticalNavigationLink icon="heart" disabled>Item</span>` : '<a luVerticalNavigationLink href="#" icon="heart">Item</a>';
		const disabledArgs = args.disabled ? ` disabled` : '';
		return {
			template: `<lu-vertical-navigation heading="Section">
	<lu-vertical-navigation-item>
		${disabledItem}
	</lu-vertical-navigation-item>
	<lu-vertical-navigation-group label="Group" icon="star">
		<lu-vertical-navigation-item>
			${disabledItem}
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			${disabledItem}
		</lu-vertical-navigation-item>
	</lu-vertical-navigation-group>
	<lu-vertical-navigation-group label="Group" expanded="false" icon="heartFilled"${disabledArgs}>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 4</a>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 5</a>
		</lu-vertical-navigation-item>
	</lu-vertical-navigation-group>`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		disabled: true,
	},
};
