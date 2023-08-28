import { Meta, Story } from '@storybook/angular';

interface RadioLegacyHelperStory {
	row: boolean;
	disabled: boolean;
	s: boolean;
}

export default {
	title: 'Documentation/Forms/Radio Legacy/Helper',
	argTypes: {
		row: {
			control: {
				type: 'boolean',
			}
		},
		disabled: {
			control: {
				type: 'boolean',
			}
		},
		s: {
			control: {
				type: 'boolean',
			},
			description: "Taille : Small",
		},
	},
} as Meta;

function getTemplate(args: RadioLegacyHelperStory): string {
	const row = args.row ? `mod-row` : '';
	const disabled = args.disabled ? `disabled` : '';
	const s = args.s ? `mod-S` : '';
	return `
	<fieldset class="radiosfield">
		<legend class="radiosfield-label">Liste de radios</legend>
		<div class="radiosfield-input ${row}">
			<div>
				<label class="radio ${s}">
					<input class="radio-input" type="radio" name="radioList1" ${disabled} checked>
					<div class="radio-label">Label <div class="radio-label-helper">Helper text</div></div>
				</label>
			</div>
			<div>
				<label class="radio ${s}">
					<input class="radio-input" type="radio" name="radioList1" ${disabled}>
					<div class="radio-label">Label <div class="radio-label-helper">Helper text</div></div>
				</label>
			</div>
		</div>
	</fieldset>
	`
}

const Template: Story<RadioLegacyHelperStory> = (args: RadioLegacyHelperStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Helper = Template.bind({});
Helper.args = { row: false, disabled: false, s: false };
