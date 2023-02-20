import { Meta, Story } from '@storybook/angular';

interface LabelBasicStory {
	palette: string;
	size: string;
}

export default {
	title: 'Documentation/Texts/Label/Basic',
	argTypes: {
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
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
	return `
		<span class="label ${classes}">Label</span>
		<span class="label ${classes} mod-number">7</span>
	`;
}

const Template: Story<LabelBasicStory> = (args: LabelBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.label {
			margin-right: var(--spacings-XXS);
		}`,
	],
});

export const Basic = Template.bind({});
Basic.args = { palette: '', size: '' };
