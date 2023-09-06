import { Meta, StoryFn } from '@storybook/angular';

interface timepickerBasicStory {
	s: boolean;
	disabled: boolean;
}

export default {
	title: 'Documentation/Forms/Timepicker/Basic',
	argTypes: {
		s: {
			control: {
				type: 'boolean',
			},
			description: 'Taille : Small',
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: timepickerBasicStory): string {
	const disabled = args.disabled ? `disabled` : '';
	const s = args.s ? `mod-S` : '';
	return `
<fieldset class="timepicker ${s}" ${disabled}>
	<legend class="u-mask">Durée</legend>
	<div class="timepicker-field">
		<label>
			<span class="u-mask">heures</span>
			<input class="timepicker-field-input" type="number" min="0" max="23" step="1" value="7">
		</label>
		<button class="timepicker-field-increment" type="button" tabindex="-1" aria-hidden="true">
			<span class="lucca-icon icon-chevronTop"></span>
		</button>
		<button class="timepicker-field-increment" type="button" tabindex="-1" aria-hidden="true">
			<span class="lucca-icon icon-chevronBottom"></span>
		</button>
	</div>
	<div class="timepicker-separator" aria-hidden="true">h</div>
	<div class="timepicker-field">
		<label>
			<span class="u-mask">minutes</span>
			<input class="timepicker-field-input" type="number" min="00" max="45" step="15" value="00">
		</label>
		<button class="timepicker-field-increment" type="button" tabindex="-1" aria-hidden="true">
			<span class="lucca-icon icon-chevronTop"></span>
		</button>
		<button class="timepicker-field-increment" type="button" tabindex="-1" aria-hidden="true">
			<span class="lucca-icon icon-chevronBottom"></span>
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
Basic.args = { s: false, disabled: false };
