import { VerticalNavigationComponent, VerticalNavigationLinkDirective } from '@lucca-front/ng/vertical-navigation';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface VerticalNavigationStories {
	sectionTitle: string;
	title: string;
	disabled: boolean;
	iconless: boolean;
}

export default {
	title: 'Documentation/Navigation/VerticalNavigation/Angular/Basic',
	argTypes: {
		sectionTitle: {
			control: {
				type: 'text',
			},
		},
		title: {
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
			imports: [VerticalNavigationComponent, VerticalNavigationLinkDirective],
		}),
	],
	render: (args: VerticalNavigationStories) => {
		const sectionTitle = ` sectionTitle="${args.sectionTitle ? args.sectionTitle : ''}"`;
		const title = ` title="${args.title ? args.title : ''}"`;
		const icon = args.iconless ? '' : ` icon="heart"`;
		const disabled = args.disabled ? ` disabled` : '';
		return {
			template: cleanupTemplate(`<lu-vertical-navigation${sectionTitle}${title}${icon}>
	<a *luVerticalNavigationLink aria-current="page" href="#">Item 1</a>
	<a *luVerticalNavigationLink href="#"${disabled}>Item 2</a>
	<a *luVerticalNavigationLink href="#"${disabled}>Item 3</a>
	<a *luVerticalNavigationLink href="#"${disabled}>Item 4</a>
</lu-vertical-navigation>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		sectionTitle: 'Section',
		title: 'Item',
		disabled: false,
		iconless: false,
	},
};
