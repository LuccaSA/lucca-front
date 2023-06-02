import { Meta, StoryFn } from '@storybook/angular';

interface StatusImportantStory {
	palette: string;
	importantLabel: string;
	state: string;
}

export default {
	title: 'Documentation/Texts/Status/Important',
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
		importantLabel: { control: 'text' },
	},
} as Meta;

function getTemplate(args: StatusImportantStory): string {
	return `
		<span class="status ${args.state}">
			<span class="status-dot ${args.palette}">
				<span class="status-dot-important">
					<span class="u-mask">${args.importantLabel}</span>
				</span>
			</span>
			<span class="status-label">Status</span>
		</span>
	`;
}

const Template: StoryFn<StatusImportantStory> = (args: StatusImportantStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Important = Template.bind({});
Important.args = { palette: '', state: '', importantLabel: 'Important :' };
