import { Meta, StoryFn } from '@storybook/angular';

interface RadioLegacyBasicStory {
	row: boolean;
	disabled: boolean;
	s: boolean;
}

export default {
	title: 'Documentation/Forms/Radio Legacy/Basic',
	argTypes: {
		row: {
			control: {
				type: 'boolean',
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		s: {
			control: {
				type: 'boolean',
			},
			description: 'Taille : Small',
		},
	},
} as Meta;

function getTemplate(args: RadioLegacyBasicStory): string {
	const row = args.row ? ` mod-row` : '';
	const disabled = args.disabled ? ` disabled` : '';
	const s = args.s ? ` mod-S` : '';
	return `<fieldset class="radiosfield">
	<legend class="radiosfield-label">Liste de radios</legend>
	<div class="radiosfield-input${row}">
		<div>
			<label class="radio${s}">
				<input class="radio-input" type="radio" name="radioList1"${disabled} checked>
				<span class="radio-label">Label</span>
			</label>
		</div>
		<div>
			<label class="radio${s}">
				<input class="radio-input" type="radio" name="radioList1"${disabled}>
				<span class="radio-label">Label</span>
			</label>
		</div>
	</div>
</fieldset>`;
}

const Template: StoryFn<RadioLegacyBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { row: false, disabled: false, s: false };
