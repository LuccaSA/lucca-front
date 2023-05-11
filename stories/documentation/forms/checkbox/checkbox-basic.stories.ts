import { Meta, Story } from '@storybook/angular';

interface CheckboxBasicStory {
	row: boolean;
	disabled: boolean;
	s: boolean;
	required: boolean;
}

export default {
	title: 'Documentation/Forms/Checkboxes/Basic',
	argTypes: {
		s: {
			description: 'Taille : Small',
			control: {
				type: 'boolean',
			},
		},
		row: {
			description: "En dehors d'un <code>.checkboxesfield-input</code>, <code>.mod-inline</code> peut être ajouté sur <code>.checkbox</code> pour obtenir un affichage horizontal.",
			control: {
				type: 'boolean',
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		required: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: CheckboxBasicStory): string {
	const row = args.row ? `mod-row` : '';
	const s = args.s ? `mod-S` : '';
	const disabled = args.disabled ? `disabled` : '';
	const required = args.required ? `aria-required="true"` : '';
	return `
	<fieldset class="checkboxesfield">
		<legend class="checkboxesfield-label">Liste de checkboxes</legend>
		<div class="checkboxesfield-input ${row}">
			<div>
				<label class="checkbox ${s}">
					<input class="checkbox-input" type="checkbox" name="checkboxList1" ${disabled} ${required} checked>
					<span class="checkbox-label">Label</span>
				</label>g
			</div>
			<div>
				<label class="checkbox ${s}">
					<input class="checkbox-input" type="checkbox" name="checkboxList1" ${disabled} ${required}>
					<span class="checkbox-label">Label</span>
				</label>
			</div>
		</div>
	</fieldset>
	`;
}

const Template: Story<CheckboxBasicStory> = (args: CheckboxBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { s: false, row: false, disabled: false, required: false };
