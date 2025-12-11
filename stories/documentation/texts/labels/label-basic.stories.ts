import { Meta, StoryObj } from '@storybook/angular';

interface LabelBasicStory {
	palette: string;
	size: string;
}

export default {
	title: 'Documentation/Texts/Label/Basic',
	argTypes: {
		palette: {
			options: ['', 'palette-product', 'palette-neutral', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['', 'mod-S', 'mod-XS'],
			control: {
				type: 'radio',
			},
			description: "Ne fonctionne qu'avec le mod-number",
		},
	},
} as Meta;

function getTemplate(args: LabelBasicStory): string {
	const classes = [args.palette, args.size].filter(Boolean).join(' ');
	return `<span class="label ${classes}">Label</span>
<span class="label ${classes} mod-number">7</span>`;
}

const Template = (args: LabelBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.label {
			margin-inline-end: var(--pr-t-spacings-50);
		}`,
	],
});

export const Basic: StoryObj<LabelBasicStory> = {
	args: { palette: '', size: '' },
	render: Template,
};
