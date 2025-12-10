import { Meta, StoryObj } from '@storybook/angular';

interface ProgressionBasicStory {
	status: string;
	indeterminate: boolean;
	width: number;
}

export default {
	title: 'Documentation/Loaders/Progression/Basic',
	argTypes: {
		status: {
			options: ['', 'is-success', 'is-error'],
			control: {
				type: 'radio',
			},
		},
		indeterminate: {
			control: {
				type: 'boolean',
			},
		},
		width: {
			control: {
				type: 'range',
				min: 0,
				max: 100,
				step: 1,
			},
		},
	},
} as Meta;

function getTemplate(args: ProgressionBasicStory): string {
	const classes = [args.status].filter(Boolean).join(' ');
	const indeterminate = args.indeterminate ? `mod-indeterminate` : '';
	return `
	<div class="progress ${classes} ${indeterminate}">
		<div class="progress-bar" [attr.style]="'width:' + width + '%'"></div>
	</div>
	`;
}

const Template = (args: ProgressionBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<ProgressionBasicStory> = {
	args: { status: '', indeterminate: false, width: 50 },
	render: Template,
};
