import { VerticalNavigationComponent, VerticalNavigationItemComponent, VerticalNavigationLinkComponent } from '@lucca-front/ng/vertical-navigation';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

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
			imports: [VerticalNavigationComponent, VerticalNavigationLinkComponent, VerticalNavigationItemComponent],
		}),
	],
	render: (args: VerticalNavigationIconlessStory) => {
		const icon = args.iconless ? '' : ` icon="heart"`;
		return {
			template: cleanupTemplate(`<lu-vertical-navigation title="Section">
	<lu-vertical-navigation-list label="Item Group 1"${icon}>
		<a *luVerticalNavigationLink href="#" aria-current="page">Item 1</a>
		<a *luVerticalNavigationLink href="#">Item 2</a>
	</lu-vertical-navigation-list>
	<lu-vertical-navigation-item label="Item 1" ${icon} />
	<lu-vertical-navigation-item label="Item 2" ${icon} />
`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		iconless: true,
	},
};
