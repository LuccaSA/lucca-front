import { Meta, Story } from '@storybook/angular';

interface ClearBasicStory {
	s: boolean,
	primary: boolean,
	disabled: boolean,
}

export default {
	title: 'Documentation/Texts/Clear/Basic',
	argTypes: {
		s: {
			control: {
				type: 'boolean',
			},
		},
		primary: {
			control: {
				type: 'boolean',
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: ClearBasicStory): string {
	const s = args.s ? `mod-S` : '';
	const primary = args.primary ? `palette-primary` : '';
	const disabled = args.disabled ? `disabled` : '';
	return `
		<a href="#" class="clear ${s} ${primary}" ${disabled}><span aria-hidden="true" class="lucca-icon icon-close"></span></a>
	`;
}

const Template: Story<ClearBasicStory> = (args: ClearBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { s: false, primary: false, disabled: false, };
