import { StatusBadgeComponent } from '@lucca-front/ng/statusBadge';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface StatusBadgeAngularStory {
	label: string;
	size: string;
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
		size: {
			options: ['', 'L'],
			control: {
				type: 'select',
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
	const s = args.size ? `size="${args.size}"` : '';
	const p = args.palette ? `palette="${args.palette}"` : '';
	return `<lu-status-badge ${p} ${s} label="${args.label}" />`;
}

const Template: StoryFn<StatusBadgeAngularStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Angular = Template.bind({});
Angular.args = { label: 'Lorem ipsum dolor', palette: '', size: '' };
