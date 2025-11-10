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
		},
	},
	decorators: [
		moduleMetadata({
			imports: [VerticalNavigationComponent, VerticalNavigationLinkComponent, VerticalNavigationItemComponent, VerticalNavigationGroupComponent],
		}),
	],
	render: (args: VerticalNavigationDisabledStories) => {
		const disabled = args.disabled ? ` disabled="true"` : '';
		return {
			template: `<lu-vertical-navigation heading="Section">
	<lu-vertical-navigation-item>
		<a luVerticalNavigationLink href="#" icon="heart"${disabled}>Item 1</a>
	</lu-vertical-navigation-item>
	<lu-vertical-navigation-group label="Group" icon="star">
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#"${disabled}>Item 2</a>
			<a luVerticalNavigationLink href="#"${disabled}>Item 3</a>
		</lu-vertical-navigation-item>
	</lu-vertical-navigation-group>
	<lu-vertical-navigation-group label="Group" expanded="false" icon="heartFilled"${disabled}>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 4</a>
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
