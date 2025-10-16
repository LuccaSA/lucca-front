import { StatusBadgeComponent } from '@lucca-front/ng/statusBadge';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface StatusBadgeBasicStory {
	label: string;
	size: string;
	palette: string;
	withEllipsis: boolean;
}

export default {
	title: 'Documentation/Texts/StatusBadge/Angular',
	decorators: [
		moduleMetadata({
			imports: [StatusBadgeComponent],
		}),
	],
	argTypes: {
		palette: {
			options: ['', 'product', 'neutral', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
			description: '[v19.2] Neutral',
		},
		size: {
			options: ['', 'M', 'L'],
			control: {
				type: 'select',
			},
			description: '[v20.2] M',
		},
		label: {
			control: {
				type: 'text',
			},
		},
	},
} as Meta;

function getTemplate(args: StatusBadgeBasicStory): string {
	const s = args.size ? ` size="${args.size}"` : ``;
	const p = args.palette ? ` palette="${args.palette}"` : ``;
	const e = args.withEllipsis ? ` withEllipsis` : ``;
	return `<lu-status-badge label="${args.label}"${p}${s}${e} />`;
}

const Template: StoryFn<StatusBadgeBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { label: 'Status', palette: '', size: '', withEllipsis: false };
