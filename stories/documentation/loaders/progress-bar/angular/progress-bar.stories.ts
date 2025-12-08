import { ProgressBarComponent } from '@lucca-front/ng/progress-bar';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface ProgressBarBasicStory {
	state: string;
	indeterminate: boolean;
	value: number;
}

export default {
	title: 'Documentation/Loaders/Progress Bar/Angular/Basic',
	argTypes: {
		state: {
			options: ['', 'success', 'error'],
			control: {
				type: 'radio',
			},
		},
		indeterminate: {
			control: {
				type: 'boolean',
			},
		},
		value: {
			control: {
				type: 'range',
				min: 0,
				max: 100,
				step: 1,
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [ProgressBarComponent],
		}),
	],
	render: (args: ProgressBarBasicStory) => {
		const state = args.state ? ` state="${args.state}"` : '';
		const indeterminate = args.indeterminate ? ` indeterminate` : '';
		const val = args.value ? ` value="${args.value}"` : ``;
		return {
			template: cleanupTemplate(`<lu-progress-bar${state}${indeterminate}${val} />`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		state: '',
		indeterminate: false,
		value: 33,
	},
};
