import { Meta, Story } from '@storybook/angular';

interface SwitchBasicStory {
	disabled: boolean;
	inline: boolean;
	small: boolean;
}

export default {
	title: 'Documentation/Forms/Switches/Basic',
	argTypes: {
		small: {
			control: {
				type: 'boolean',
			}
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
	const small = args.small ? `mod-small` : '';
	const inline = args.inline ? `mod-inline` : '';
	return `
		<label class="switch ${small} ${inline}">
			<input class="switch-input" type="checkbox" name="switchList1" ${disabled} checked>
			<span class="switch-label">switch</span>
		</label>
		<label class="switch ${small} ${inline}">
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
Basic.args = { inline: false, disabled: false, small: false };
