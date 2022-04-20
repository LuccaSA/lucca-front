import { Meta, Story } from '@storybook/angular';

interface RadiosBasicStory {
	row: boolean;
	disabled: boolean;
	small: boolean;
	grey: boolean;
}

export default {
	title: 'Documentation/Forms/Radios/Basic',
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
		small: {
			control: {
				type: 'boolean',
			}
		},
		grey: {
			control: {
				type: 'boolean',
			}
		},
	},
} as Meta;

function getTemplate(args: RadiosBasicStory): string {
	const row = args.row ? `mod-row` : '';
	const disabled = args.disabled ? `disabled` : '';
	const small = args.small ? `mod-small` : '';
	const grey = args.grey ? `mod-grey` : '';
	return `
	<fieldset class="radiosfield">
		<legend class="radiosfield-label">Liste de radios</legend>
		<div class="radiosfield-input ${row}">
			<div>
				<label class="radio ${small} ${grey}">
					<input class="radio-input" type="radio" name="radioList1" ${disabled} checked>
					<span class="radio-label">Radio</span>
				</label>
			</div>
			<div>
				<label class="radio ${small} ${grey}">
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
Basic.args = { row: false, disabled: false, small: false, grey: false, };
