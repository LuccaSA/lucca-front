import { StatusBadgeComponent } from '@lucca-front/ng/statusBadge';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface StatusBadgeAngularStory {
	label: string;
	L: boolean;
	palette: string;
}

export default {
	title: 'Documentation/Texts/StatusBadge',
	decorators: [
		moduleMetadata({
			imports: [StatusBadgeComponent],
		}),
	],
	argTypes: {
		palette: {
			options: ['', 'product', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
		},
		L: {
			control: {
				type: 'boolean',
			},
		},
		label: {
			control: {
				type: 'text',
			},
		},
	},
} as Meta;

function getTemplate(args: StatusBadgeAngularStory): string {
	const size = args.L ? `size="L"` : '';
	const pal = args.palette ? `palette="${args.palette}"` : '';
	return `<lu-status-badge ${pal} ${size} label="${args.label}" />`;
}

const Template: StoryFn<StatusBadgeAngularStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Angular = Template.bind({});
Angular.args = { label: 'Lorem ipsum dolor', palette: '', L: false };
