import { HorizontalNavigationComponent } from '@lucca-front/ng/horizontalNavigation';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface HorizontalNavigationAngularBasicStory {
	size: string;
	content: string;
	role: boolean;
	icon: boolean;
	button: boolean;
	vertical: boolean;
}

export default {
	title: 'Documentation/Navigation/HorizontalNavigation/Angular',
	decorators: [
		moduleMetadata({
			imports: [HorizontalNavigationComponent],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: HorizontalNavigationAngularBasicStory): string {
	return `<lu-horizontal-navigation [links]="[
		{
			route: '#1',
			label: 'Page 1',
		},
		{
			route: '#2',
			label: 'Page 2',
		},
		{
			route: '#3',
			label: 'Page 3',
			disabled: true
		},
		{
			route: '#4',
			label: 'Page 4',
			counter: 8
		},
	]" />`;
}

const Template: StoryFn<HorizontalNavigationAngularBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
