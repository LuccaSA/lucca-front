import { Meta, Story } from '@storybook/angular';

interface StatusBasicStory {
	palette: string;
	state: string;
}

export default {
	title: 'Documentation/Texts/Status/Basic',
	argTypes: {
		palette: {
			options: ['', 'u-textPrimary', 'u-textSecondary', 'u-textLight', 'u-textError', 'u-textWarning', 'u-textSuccess'],
			control: {
				type: 'select',
			},
		},
		state: {
			options: ['', 'error', 'warning', 'success'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: StatusBasicStory): string {
	return `
		<span class="status ${args.state}">
			<span class="status-dot ${args.palette}"></span>
			<span class="status-label">Satus</span>
		</span>
	`;
}

const Template: Story<StatusBasicStory> = (args: StatusBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { palette: '', state: '' };
