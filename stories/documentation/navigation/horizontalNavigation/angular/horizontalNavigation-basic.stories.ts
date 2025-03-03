import { HorizontalNavigationComponent } from '@lucca-front/ng/horizontalNavigation';
import { Meta, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Navigation/HorizontalNavigation/Angular',
	argTypes: {
		size: {
			options: [null, 'S'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [HorizontalNavigationComponent],
		}),
	],
	render: (args, { argTypes }) => {
		return {
			template: `
<lu-horizontal-navigation [links]="[
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
	]" ${generateInputs(args, argTypes)} />
			`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		noBorder: false,
		container: false,
		size: 'S',
		vertical: false,
	},
};
