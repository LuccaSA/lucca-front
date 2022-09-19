import { Meta, Story } from '@storybook/angular';

interface StatusBasicStory {
	colors: string;
	important: boolean;
	status: string;
}

export default {
	title: 'Documentation/Texts/Status/Basic',
	argTypes: {
		colors: {
			options: ['', 'u-textPrimary', 'u-textSecondary', 'u-textLight', 'u-textError', 'u-textWarning', 'u-textSuccess'],
			control: {
				type: 'select',
			},
		},
		status: { control: 'text' },
	},
} as Meta;

function getTemplate(args: StatusBasicStory): string {
	return `
		<span class="status">
			<span class="status-dot ${args.colors}">
				<span class="status-dot-important" *ngIf="important"></span>
			</span>
			<span class="status-label">${args.status}</span>
		</span>
	`;
}

const Template: Story<StatusBasicStory> = (args: StatusBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { colors: 'u-textLight', important: true, status: 'Status' };
