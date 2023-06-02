import { Meta, StoryFn } from '@storybook/angular';

interface timepickerBasicStory {
	palette: string;
	mod: string;
	disabled: boolean;
}

export default {
	title: 'Documentation/Forms/Timepicker/Basic',
	argTypes: {
		mod: {
			options: ['', 'mod-outlined'],
			control: {
				type: 'radio',
			},
		},
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'select',
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: timepickerBasicStory): string {
	const classes = [args.mod, args.palette].filter(Boolean).join(' ');
	const disabled = args.disabled ? `disabled` : '';
	return `
<fieldset class="timepicker ${classes}" ${disabled}>
	<legend class="u-mask">Durée</legend>
	<div class="timepicker-field">
		<label>
			<span class="u-mask">heures</span>
			<input class="timepicker-field-input" type="number" min="0" max="23" step="1" value="1" tabindex="1">
		</label>
		<button class="timepicker-field-increment" type="button" tabindex="-1" aria-hidden="true">
			<span class="lucca-icon icon-northArrow"></span>
		</button>
		<button class="timepicker-field-increment" type="button" tabindex="-1" aria-hidden="true">
			<span class="lucca-icon icon-southArrow"></span>
		</button>
	</div>
	<div class="timepicker-separator" aria-hidden="true">:</div>
	<div class="timepicker-field">
		<label>
			<span class="u-mask">minutes</span>
			<input class="timepicker-field-input" type="number" min="00" max="45" step="15" value="15" tabindex="1">
		</label>
		<button class="timepicker-field-increment" type="button" tabindex="-1" aria-hidden="true">
			<span class="lucca-icon icon-northArrow"></span>
		</button>
		<button class="timepicker-field-increment" type="button" tabindex="-1" aria-hidden="true">
			<span class="lucca-icon icon-southArrow"></span>
		</button>
	</div>
</fieldset>
	`;
}

const Template: StoryFn<timepickerBasicStory> = (args: timepickerBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { palette: '', mod: '', disabled: false };
