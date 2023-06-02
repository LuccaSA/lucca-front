import { Meta, StoryFn } from '@storybook/angular';

interface StatusBadgeBasicStory {
	state: string;
}

export default {
	title: 'Documentation/Texts/StatusBadge/Basic',
	argTypes: {
		state: {
			options: ['', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: StatusBadgeBasicStory): string {
	return `
		<div class="statusBadge ${args.state}">Status</div>
	`;
}

const Template: StoryFn<StatusBadgeBasicStory> = (args: StatusBadgeBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { state: '' };
