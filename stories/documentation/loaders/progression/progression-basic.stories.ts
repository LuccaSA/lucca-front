import { Meta, Story } from '@storybook/angular';

interface ProgressionBasicStory {
	status: string;
	indeterminate: boolean;
}

export default {
	title: 'Documentation/Loaders/Progression/Basic',
	argTypes: {
		status: {
			options: ['', 'is-success', 'is-error'],
			control: {
				type: 'radio',
			}
		},
		indeterminate: {
			control: {
				type: 'boolean',
			}
		},
	},
} as Meta;

function getTemplate(args: ProgressionBasicStory): string {
	const classes = [args.status].filter(Boolean).join(' ');
	const indeterminate = args.indeterminate ? `mod-indeterminate` : '';
	return `
	<div class="progress ${classes} ${indeterminate}">
		<div class="progress-bar" style="width: 50%"></div>
	</div>
	`
}

const Template: Story<ProgressionBasicStory> = (args: ProgressionBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { status: '', indeterminate: false };
