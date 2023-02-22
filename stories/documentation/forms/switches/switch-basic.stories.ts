import { Meta, Story } from '@storybook/angular';

interface SwitchBasicStory {
	disabled: boolean;
	inline: boolean;
	s: boolean;
}

export default {
	title: 'Documentation/Forms/Switches/Basic',
	argTypes: {
		s: {
			control: {
				type: 'boolean',
			},
			description: "Taille : Small",
		},
		inline: {
			control: {
				type: 'boolean',
			}
		},
		disabled: {
			control: {
				type: 'boolean',
			}
		},
	},
} as Meta;

function getTemplate(args: SwitchBasicStory): string {
	const disabled = args.disabled ? `disabled` : '';
	const s = args.s ? `mod-S` : '';
	const inline = args.inline ? `mod-inline` : '';
	return `
		<label class="switch ${s} ${inline}">
			<input class="switch-input" type="checkbox" name="switchList1" ${disabled}>
			<span class="switch-label">switch</span>
		</label>
		<label class="switch ${s} ${inline}">
			<input class="switch-input" type="checkbox" name="switchList1" ${disabled} checked>
			<span class="switch-label">switch</span>
		</label>
	`
}

const Template: Story<SwitchBasicStory> = (args: SwitchBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { inline: false, disabled: false, s: false };
