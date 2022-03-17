import { Meta, Story } from '@storybook/angular';

interface RadiosBasicStory {
	row: boolean;
	disabled: boolean;
	palette: string;
}

export default {
	title: 'Documentation/Forms/Radios/Basic',
	argTypes: {
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
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
	},
} as Meta;

function getTemplate(args: RadiosBasicStory): string {
	const classes = [args.palette].filter(Boolean).join(' ');
	const row = args.row ? `mod-row` : '';
	const disabled = args.disabled ? `disabled` : '';
	return `
	<fieldset class="checkboxesfield">
		<legend class="checkboxesfield-label">Liste de radios</legend>
		<div class="checkboxesfield-input ${row}">
			<div>
				<label class="radio ${classes}">
					<input class="radio-input" type="radio" name="radioList1" ${disabled} checked>
					<span class="radio-label">Radio</span>
				</label>
			</div>
			<div>
				<label class="radio ${classes}">
					<input class="radio-input" type="radio" name="radioList1" ${disabled}>
					<span class="radio-label">Radio</span>
				</label>
			</div>
		</div>
	</fieldset>
	`
}

const Template: Story<RadiosBasicStory> = (args: RadiosBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { palette: '', row: false, disabled: false };
