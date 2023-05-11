import { Meta, Story } from '@storybook/angular';

interface SwitchHelperStory {
	disabled: boolean;
	inline: boolean;
	s: boolean;
}

export default {
	title: 'Documentation/Forms/Switches/Helper',
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

function getTemplate(args: SwitchHelperStory): string {
	const disabled = args.disabled ? `disabled` : '';
	const s = args.s ? `mod-S` : '';
	const inline = args.inline ? `mod-inline` : '';
	return `
		<label class="switch ${s} ${inline}">
			<input class="switch-input" type="checkbox" name="switchList1" ${disabled}>
			<div class="switch-label">Label <div class="switch-label-helper">Helper text</div></div>
		</label>
		<label class="switch ${s} ${inline}">
			<input class="switch-input" type="checkbox" name="switchList1" ${disabled} checked>
			<div class="switch-label">Label <div class="switch-label-helper">Helper text</div></div>
		</label>
	`
}

const Template: Story<SwitchHelperStory> = (args: SwitchHelperStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Helper = Template.bind({});
Helper.args = { inline: false, disabled: false, s: false };
