import { VerticalNavigationComponent, VerticalNavigationItemComponent, VerticalNavigationLinkComponent } from '@lucca-front/ng/vertical-navigation';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

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
			imports: [VerticalNavigationComponent, VerticalNavigationLinkComponent, VerticalNavigationItemComponent],
		}),
	],
	render: (args: VerticalNavigationDisabledStories) => {
		const disabled = args.disabled ? ` disabled="true"` : '';
		return {
			template: cleanupTemplate(`<lu-vertical-navigation title="Section">
	<lu-vertical-navigation-list label="Item Group 1" icon="heart"${disabled}>
		<a *luVerticalNavigationLink href="#"${disabled}>Item 1</a>
		<a *luVerticalNavigationLink href="#"${disabled}>Item 2</a>
	</lu-vertical-navigation-list>
	<lu-vertical-navigation-item label="Item 1" icon="heart"${disabled} />
	<lu-vertical-navigation-item label="Item 2" icon="heartFilled"${disabled} />
</lu-vertical-navigation>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		disabled: true,
	},
};
