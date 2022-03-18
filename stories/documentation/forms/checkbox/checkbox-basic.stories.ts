import { Meta, Story } from '@storybook/angular';

interface CheckboxBasicStory {
	row: boolean;
	disabled: boolean;
	palette: string;
	size: string;
	required: boolean;
}

export default {
	title: 'Documentation/Forms/Checkboxes/Basic',
	argTypes: {
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'radio',
			}
		},
		size: {
			options: ['', 'mod-small', 'mod-big'],
			control: {
				type: 'radio',
			}
		},
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
		required: {
			control: {
				type: 'boolean',
			}
		},
	},
} as Meta;

function getTemplate(args: CheckboxBasicStory): string {
	const classes = [args.size, args.palette].filter(Boolean).join(' ');
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
	`
}

const Template: Story<CheckboxBasicStory> = (args: CheckboxBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { palette: '', size: '', row: false, disabled: false, required: false };
