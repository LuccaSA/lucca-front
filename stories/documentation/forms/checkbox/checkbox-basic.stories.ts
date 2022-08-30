import { Meta, Story } from '@storybook/angular';

interface CheckboxBasicStory {
	row: boolean;
	disabled: boolean;
	size: string;
	required: boolean;
}

export default {
	title: 'Documentation/Forms/Checkboxes/Basic',
	argTypes: {
		size: {
			options: ['', 'mod-small', 'mod-big'],
			control: {
				type: 'radio',
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
	const classes = [args.size].filter(Boolean).join(' ');
	const row = args.row ? `mod-row` : '';
	const disabled = args.disabled ? `disabled` : '';
	const required = args.required ? `aria-required="true"` : '';
	return `
	<fieldset class="checkboxesfield">
		<legend class="checkboxesfield-label">Liste de checkboxes</legend>
		<div class="checkboxesfield-input ${row}">
			<div>
				<label class="checkbox ${classes}">
					<input class="checkbox-input" type="checkbox" name="checkboxList1" ${disabled} ${required} checked>
					<span class="checkbox-label">checkbox</span>
				</label>
			</div>
			<div>
				<label class="checkbox ${classes}">
					<input class="checkbox-input" type="checkbox" name="checkboxList1" ${disabled} ${required}>
					<span class="checkbox-label">checkbox</span>
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
Basic.args = { size: '', row: false, disabled: false, required: false };
