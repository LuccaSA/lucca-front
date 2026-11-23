import { PROGRESS_BAR_STATE, ProgressBarComponent } from '@lucca-front/ng/progress-bar';
import { Meta, moduleMetadata } from '@storybook/angular-vite';
import { cleanupTemplate, setStoryOptions } from '@/helpers/stories';

interface ProgressBarBasicStory {
	state: string;
	indeterminate: boolean;
	value: number;
}

export default {
	title: 'Documentation/Loaders/Progress Bar/Angular/Basic',
	component: ProgressBarComponent,
	argTypes: {
		state: {
			options: setStoryOptions(PROGRESS_BAR_STATE),
			control: {
				type: 'select',
			},
			description: 'État du composant.',
			table: { category: 'inputs', defaultValue: { summary: 'null' } },
		},
		indeterminate: {
			control: {
				type: 'boolean',
			},
			description: 'Affiche un état de chargement sans information de progression.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		value: {
			control: {
				type: 'range',
				min: 0,
				max: 100,
				step: 1,
			},
			description: 'Pourcentage de progression.',
			table: { category: 'inputs', defaultValue: { summary: '0' } },
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
} as Meta<ProgressBarBasicStory>;

export const Basic = {
	args: {
		state: '',
		indeterminate: false,
		value: 33,
	},
};
