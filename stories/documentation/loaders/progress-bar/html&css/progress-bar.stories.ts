import { Meta, StoryObj } from '@storybook/angular';

interface ProgressionBasicStory {
	status: string;
	indeterminate: boolean;
	width: number;
}

export default {
	title: 'Documentation/Loaders/Progress Bar/HTML&CSS/Basic',
	argTypes: {
		status: {
			options: ['', 'is-success', 'is-error'],
			control: {
				type: 'radio',
			},
			description: 'État du composant.',
		},
		indeterminate: {
			control: {
				type: 'boolean',
			},
			description: 'Affiche un état de chargement sans information de progression.',
		},
		width: {
			control: {
				type: 'range',
				min: 0,
				max: 100,
				step: 1,
			},
			description: 'Pourcentage de progression.',
		},
	},
} as Meta;

function getTemplate(args: ProgressionBasicStory): string {
	const classes = args.status ? ` ${args.status}` : '';
	const indeterminate = args.indeterminate ? ` mod-indeterminate` : '';
	return `
	<div class="progress${classes}${indeterminate}">
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
